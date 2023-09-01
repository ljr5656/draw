import { EShapeType, IShapeAttrs } from '../type';
import { genId, objectNameGenerator } from '../utils/common';

export class Shape {
  type = EShapeType.Shape;
  id: string;
  objectName: string;
  x: number;
  y: number;
  width: number;
  height: number;
  // color
  fillStyle: string = '';
  strokeStyle: string = '';
  lineWidth: number = 0;
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

    options.fillStyle && (this.fillStyle = options.fillStyle);
    options.strokeStyle && (this.strokeStyle = options.strokeStyle);
    options.lineWidth && (this.lineWidth = options.lineWidth);

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
      fillStyle: this.fillStyle,
      strokeStyle: this.strokeStyle,
      lineWidth: this.lineWidth,
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

  // 获取包围盒
  getBBoxWithoutRotation() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
  }
}
