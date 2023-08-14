import { IRectOption } from './interface';
import { BaseShape } from './baseShape';

export class Rect extends BaseShape {
  public x: number;
  public y: number;
  public width: number;
  public height: number;

  constructor(canvas: HTMLCanvasElement, option: IRectOption) {
    super(canvas);
    this.x = option.x;
    this.y = option.y;
    this.width = option.width;
    this.height = option.height;
  }

  public hitTest() {}

  public draw() {
    this.rc.rectangle(this.x, this.y, this.width, this.height);
    super.draw();
  }
}
