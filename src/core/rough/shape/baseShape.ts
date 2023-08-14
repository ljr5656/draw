import rough from 'roughjs';
import { RoughCanvas } from 'roughjs/bin/canvas';
import { RoughGenerator } from 'roughjs/bin/generator';

export class BaseShape {
  name: string;

  public rc: RoughCanvas;
  public rcGen: RoughGenerator;
  constructor(canvas: HTMLCanvasElement) {
    this.rc = rough.canvas(canvas);
    this.rcGen = this.rc.generator;
  }

  public draw() {}
}
