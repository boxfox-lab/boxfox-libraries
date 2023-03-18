export function useFadeInOutOption<T>(
  value?: { fadeIn?: T; fadeOut?: T } | T
): {
  fadeIn?: T;
  fadeOut?: T;
} {
  return typeof value === "object" ? value : { fadeIn: value, fadeOut: value };
}
