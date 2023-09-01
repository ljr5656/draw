import { v4 as uuidv4 } from 'uuid';

// 生成唯一id
export const genId = () => {
  return uuidv4();
};

export const objectNameGenerator = {
  maxIdxMap: new Map<string, number>(),
  gen(type: string) {
    let idx = this.maxIdxMap.get(type) ?? 0;
    idx++;
    this.maxIdxMap.set(type, idx);
    return `${type} ${idx}`;
  },
  setMaxIdx(objectName: string) {
    const match = objectName.match(/^(.*)\s+(\d+)$/);
    if (match) {
      const [, type, idxStr] = match;
      const idx = Number(idxStr);
      this.maxIdxMap.set(type, Math.max(this.maxIdxMap.get(type) ?? 0, idx));
    }
  },
};

export const isWindows =
  navigator.platform.toLowerCase().includes('win') ||
  navigator.userAgent.includes('Windows');
