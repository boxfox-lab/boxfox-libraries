export function coerceCssPixelValue(value: string | number): string {
  return typeof value === "string" ? value : `${value}px`;
}
