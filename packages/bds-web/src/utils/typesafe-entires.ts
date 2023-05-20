export function typeSafeEntires<T extends string, V>(
  data: Partial<Record<T, V>>
) {
  return Object.entries(data) as Array<[T, V]>;
}

export function typeSafeFromPairs<T extends string, V>(data: Array<[T, V]>) {
  return Object.fromEntries(data) as Record<T, V>;
}
