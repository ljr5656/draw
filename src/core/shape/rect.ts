import { Shape } from './shape';
import { IRectAttrs, EShapeType } from '../type';

export class Rect extends Shape {
  constructor(options: IRectAttrs) {
    super({
      ...options,
      type: EShapeType.Rect,
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    // 设置填充颜色
    ctx.fillStyle = this.fillStyle;
    // 设置边框颜色和宽度
    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = this.lineWidth;
    ctx.rect(this.x, this.y, this.width, this.height);
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
