const _all: string = "0123456789abcdefghijklmnopqrstuvwxyz";

/**
 * 随机一个字符串
 * @param chars 可选的字符
 * @param length 长度
 * @returns {string}
 */
export function randomChars(chars: string, length: number): string {
  let result = "";
  let charLength = chars.length;
  for (let i = 0; i < length; i++) {
    result += chars[randomInteger(0, charLength - 1)];
  }
  return result;
}

/**
 * 随机一个min~max的数字
 * @param min
 * @param max
 * @returns {*}
 */
export function randomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * UUID
 * @returns {string}
 */
export function uuid() {
  return randomChars(_all, 32);
}
