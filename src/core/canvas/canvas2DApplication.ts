import { Application } from '../application';

export class Canvas2DApplication extends Application {
  context: CanvasRenderingContext2D;
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.context = canvas.getContext('2d') as CanvasRenderingContext2D;
  }
}
