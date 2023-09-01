import { EShapeType, IShapeAttrs } from '../type';
import { genId, objectNameGenerator } from '../utils';

export class Shape {
  type = EShapeType.Shape;
  id: string;
  objectName: string;
  x: number;
  y: number;
  width: number;
  height: number;
  // color
  fill: string = '';
  stroke: string = '';
  strokeWidth?: number;
  // transform
  rotation?: number;

  constructor(options: IShapeAttrs) {
    this.type = options.type ?? this.type;
    this.id = options.id ?? genId();

    if (options.objectName) {
      this.objectName = options.objectName;
      objectNameGenerator.setMaxIdx(options.objectName);
    } else {
      this.objectName = objectNameGenerator.gen(options.type ?? this.type);
    }

    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;

    options.fill && (this.fill = options.fill);
    options.stroke && (this.stroke = options.stroke);
    options.strokeWidth && (this.strokeWidth = options.strokeWidth);

    options.rotation && (this.rotation = options.rotation);
  }

  getAttrs(): IShapeAttrs {
    return {
      type: this.type,
      id: this.id,
      objectName: this.objectName,
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      fill: this.fill,
      stroke: this.stroke,
      strokeWidth: this.strokeWidth,
      rotation: this.rotation,
    };
  }

  setAttrs(attrs: Partial<IShapeAttrs>) {
    let key: keyof Partial<IShapeAttrs>;
    for (key in attrs) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias, @typescript-eslint/no-explicit-any
      const self: any = this;
      self[key] = attrs[key];
    }
  }
}
