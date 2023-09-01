export interface IVec2 {
  x: number;
  y: number;
}
//#region Matrix
export type IMatrix23 = [
  [a: number, b: number, tx: number],
  [a: number, d: number, ty: number],
];

export function createRotationMatrix(angleInRadians: number): IMatrix23 {
  const cosTheta = Math.cos(angleInRadians);
  const sinTheta = Math.sin(angleInRadians);
  return [
    [cosTheta, -sinTheta, 0],
    [sinTheta, cosTheta, 0],
  ];
}

export function createScaleMatrix(
  scaleX: number = 1,
  scaleY: number = 1,
): IMatrix23 {
  return [
    [scaleX, 0, 0],
    [0, scaleY, 0],
  ];
}

export function createTranslationMatrix(
  tx: number = 0,
  ty: number = 0,
): IMatrix23 {
  return [
    [1, 0, tx],
    [0, 1, ty],
  ];
}

//#endregion

//#region transform
export function applyAffineTransform(
  { x, y }: IVec2,
  [[a, b, tx], [c, d, ty]]: IMatrix23,
): IVec2 {
  return {
    x: x * a + y * b + tx,
    y: x * c + y * d + ty,
  };
}

// 旋转向量(绕中心旋转)
export function rotateVec2(vec: IVec2, angleInRadians: number): IVec2 {
  const martix: IMatrix23 = createRotationMatrix(angleInRadians);
  return applyAffineTransform(vec, martix);
}
// 旋转向量(绕指定点旋转)
export function rotateVec2AroundPoint(
  vec: IVec2,
  angleInRadians: number,
  center: IVec2,
): IVec2 {
  // 1. 将旋转中心平移到原点
  const translationToOrigin = createTranslationMatrix(-center.x, -center.y);

  // 2. 创建旋转矩阵
  const rotationMatrix = createRotationMatrix(angleInRadians);

  // 3. 将旋转中心还原回去
  const translationBack = createTranslationMatrix(center.x, center.y);

  // 4. 组合上述矩阵
  const combinedMatrix: IVec2 = applyAffineTransform(
    applyAffineTransform(
      applyAffineTransform(vec, translationToOrigin),
      rotationMatrix,
    ),
    translationBack,
  );

  // 5. 返回旋转后的向量
  return combinedMatrix;
}
// 缩放向量
export function scaleVec2(vec: IVec2, sx: number = 1, sy: number = 1) {
  const martix: IMatrix23 = createScaleMatrix(sx, sy);
  return applyAffineTransform(vec, martix);
}

// 平移向量
export function translateVec2(
  vec: IVec2,
  tx: number = 0,
  ty: number = 0,
): IVec2 {
  const martix: IMatrix23 = createTranslationMatrix(tx, ty);
  return applyAffineTransform(vec, martix);
}
//#endregion
