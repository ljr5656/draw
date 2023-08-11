import { Application } from '../application';
import rough from 'roughjs';
import { RoughCanvas } from 'roughjs/bin/canvas';
import { Drawable, Op } from 'roughjs/bin/core';
import { RoughGenerator } from 'roughjs/bin/generator';

export enum EPenType {
  DRAG,
  DRAW,
}
export class RoughApplication extends Application {
  rc: RoughCanvas;
  rcGen: RoughGenerator;
  shapes: Drawable[];
  currentShape: Drawable | undefined;
  context: CanvasRenderingContext2D | null;

  //#region
  startX: number = 0;
  startY: number = 0;
  endX: number = 0;
  endY: number = 0;
  //#endregion

  //#region
  dragStartX: number = 0;
  dragStartY: number = 0;
  translateX: number = 0;
  translateY: number = 0;
  scaleX: number = 1;
  scaleY: number = 1;
  //#endregion

  _penType: EPenType = EPenType.DRAG;
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.context = canvas.getContext('2d');
    this.rc = rough.canvas(canvas);
    this.rcGen = this.rc.generator;
    this.shapes = [];
    this.setDrag();
  }

  public update(msec: number, diff: number): void {}

  public render(): void {
    if (this.context !== null) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.currentShape && this.rc.draw(this.currentShape);
      this.shapes.forEach((shape) => {
        // shape.sets[0].ops
        this.rc.draw(shape);
      });

      // this.context.translate(this.translateX, this.translateY);
      // console.log(this.scale);

      // this.context.scale(this.scale, this.scale);
      // this.scale = 1;
    }
  }

  protected dispatchMouseDown(ev: MouseEvent): void {
    const { clientX, clientY } = ev;
    const { _penType } = this;
    switch (_penType) {
      case EPenType.DRAG:
        this.dragStartX = clientX;
        this.dragStartY = clientY;
        break;
      case EPenType.DRAW:
        this.startX = clientX;
        this.startY = clientY;
        this.endX = clientX;
        this.endY = clientY;
        break;
    }
  }

  protected dispatchMouseMove(ev: MouseEvent): void {
    const { clientX, clientY } = ev;
    const { _penType } = this;
    switch (_penType) {
      case EPenType.DRAG:
        this.translateX += clientX - this.dragStartX;
        this.translateY += clientY - this.dragStartY;
        this.dragStartX = clientX;
        this.dragStartY = clientY;
        break;
      case EPenType.DRAW:
        this.endX = clientX;
        this.endY = clientY;
        this.currentShape = this.rect();
        break;
    }
  }

  protected dispatchMouseUp(ev: MouseEvent): void {
    const { _penType } = this;
    switch (_penType) {
      case EPenType.DRAG:
        this.translateX = 0;
        this.translateY = 0;
        break;
      case EPenType.DRAW:
        this.currentShape && this.shapes.push(this.currentShape);
        this.currentShape = undefined;
        break;
    }
  }

  public rect() {
    const { startX, startY, endX, endY } = this;
    return this.rcGen.rectangle(startX, startY, endX - startX, endY - startY);
  }

  private setPenType(type: EPenType) {
    this._penType = type;
    this.setCursor();
  }

  public setDrag() {
    this.setPenType(EPenType.DRAG);
  }

  public setDraw() {
    this.setPenType(EPenType.DRAW);
  }

  private setCursor() {
    const { _penType } = this;
    switch (_penType) {
      case EPenType.DRAG:
        this.canvas.style.cursor = 'pointer';
        break;
      case EPenType.DRAW:
        this.canvas.style.cursor = 'default';
        break;
    }
  }

  public setZoomIn() {
    console.log('in', this.scaleX, this.scaleY);

    if (this.scaleX < 0.7) {
      return;
    }
    this.scaleX -= 0.1;
    this.scaleY -= 0.1;
    this.transform();
  }

  public setZoomOut() {
    console.log('out', this.scaleX, this.scaleY);
    if (this.scaleX > 1.3) {
      return;
    }
    this.scaleX += 0.1;
    this.scaleY += 0.1;
    this.transform();
  }

  public transform() {
    this.shapes.forEach((shape) => {
      shape.sets[0].ops = shape.sets[0].ops.map<Op>((item: Op): Op => {
        const newData = item.data.map((dataItem, index) => {
          // x
          if (index % 2 === 0) {
            return dataItem * this.scaleX + this.translateX;
          } else {
            // y
            return dataItem * this.scaleY + this.translateY;
          }
        });
        return {
          op: item.op,
          data: newData,
        };
      });
    });
  }
}
