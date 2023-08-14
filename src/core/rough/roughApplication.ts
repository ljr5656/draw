import { Application } from '../application';

export enum EPenType {
  DRAG,
  DRAW,
}
export class RoughApplication extends Application {
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
  }

  public update(msec: number, diff: number): void {}

  public render(): void {
    if (this.context !== null) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  protected dispatchMouseDown(ev: MouseEvent): void {}

  protected dispatchMouseMove(ev: MouseEvent): void {}

  protected dispatchMouseUp(ev: MouseEvent): void {}
}
