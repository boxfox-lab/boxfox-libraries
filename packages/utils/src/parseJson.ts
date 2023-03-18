export function parseJson<T>(raw: string) {
  return JSON.parse(raw) as T;
}

export function isJson(raw: string) {
  try {
    JSON.parse(raw);
    return true;
  } catch (e) {
    return false;
  }
}
