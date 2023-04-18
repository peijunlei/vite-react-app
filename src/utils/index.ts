
/**
 * 生成随机数
 * @param min 
 * @param max 
 * @returns 
 */
export function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateImageList(size: number, num: number) {
  return Array.from({ length: num }).map((v,i) => `https://picsum.photos/${size}/?random=${i}`)
}