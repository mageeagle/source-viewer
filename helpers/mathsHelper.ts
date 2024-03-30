export function expoentialMap(val: number, e: number, scale: number) {
  return Math.pow(val, e) * scale;
}

export function between(x: number, min: number, max: number) {
  return x >= min && x <= max;
}

export function deg2rad(num: number) {
  return (num * (Math.PI / 180));
}

export function rad2deg(num: number) {
  return (num / (Math.PI / 180));
}

export function aed2xyz([a, e, d]: [a: number, e: number, d: number]) {
  // SPAT AED Format
  const er = deg2rad(e)
  const ar = deg2rad(a)
  const x = d * Math.cos(er) * Math.sin(ar);
  const y = d * Math.cos(er) * Math.cos(ar);
  const z = d * Math.sin(er);
  return [x, y, z];
}

export function xyz2aed([x, y, z]: [x: number, y: number, z: number]) {
  // SPAT AED Format
  const d = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2))
  const a = 90 - rad2deg(Math.atan2(y, x))
  const e = rad2deg(Math.atan2(z, Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))))
  return [a, e, d];
}
