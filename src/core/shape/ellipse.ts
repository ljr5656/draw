import { Shape } from './shape';
import { IEllipseAttrs, EShapeType } from '../type';
import { DOUBLE_PI } from '../utils/constant';
export class Ellipse extends Shape {
  constructor(options: IEllipseAttrs) {
    super({
      ...options,
      type: EShapeType.Ellipse,
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    const cx = this.x + this.width / 2;
    const cy = this.y + this.height / 2;

    ctx.beginPath();
    ctx.ellipse(cx, cy, this.width / 2, this.height / 2, 0, 0, DOUBLE_PI);

    ctx.fillStyle = this.fillStyle;
    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = this.lineWidth;

    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }

  getBBoxWithoutRotation() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
  }
}
