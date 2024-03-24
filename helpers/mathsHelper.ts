export function expoentialMap(val: number, e: number, scale: number) {
  return Math.pow(val, e) * scale;
}

export function between(x: number, min: number, max: number) {
  return x >= min && x <= max;
}