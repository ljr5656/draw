import { Application } from '../application';
import rough from 'roughjs';
import { RoughCanvas } from 'roughjs/bin/canvas';
import { Drawable } from 'roughjs/bin/core';
import { RoughGenerator } from 'roughjs/bin/generator';
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
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.context = canvas.getContext('2d');
    this.rc = rough.canvas(canvas);
    this.rcGen = this.rc.generator;
    this.shapes = [];
  }

  public update(msec: number, diff: number): void {}

  public render(): void {
    if (this.context !== null) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.currentShape && this.rc.draw(this.currentShape);
      this.shapes.forEach((shape) => {
        this.rc.draw(shape);
      });
    }
  }

  protected dispatchMouseDown(ev: MouseEvent): void {
    const { clientX, clientY } = ev;
    this.startX = clientX;
    this.startY = clientY;
    this.endX = clientX;
    this.endY = clientY;
  }

  protected dispatchMouseMove(ev: MouseEvent): void {
    const { clientX, clientY } = ev;
    this.endX = clientX;
    this.endY = clientY;
    this.currentShape = this.rect();
  }

  protected dispatchMouseUp(ev: MouseEvent): void {
    this.currentShape && this.shapes.push(this.currentShape);
    this.currentShape = undefined;
  }

  public rect() {
    const { startX, startY, endX, endY } = this;
    return this.rcGen.rectangle(startX, startY, endX - startX, endY - startY);
  }
}
