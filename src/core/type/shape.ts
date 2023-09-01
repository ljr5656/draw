export enum EShapeType {
  Shape = 'Shape',
  Rect = 'Rect',
  Ellipse = 'Ellipse',
  Text = 'Text',
  Line = 'Line',
}

export interface IShapeAttrs {
  type?: EShapeType;
  id?: string;
  objectName?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  // 颜色
  fillStyle?: string;
  strokeStyle?: string;
  lineWidth?: number;
  // transform 相关
  rotation?: number;
}

export type IRectAttrs = IShapeAttrs;
