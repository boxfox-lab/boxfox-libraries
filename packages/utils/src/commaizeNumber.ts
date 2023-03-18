export function commaizeNumber(value: string | number) {
  const parts = String(value).split(".");
  return [Number(parts.splice(0, 1)).toLocaleString(), ...parts].join(".");
}
