export function matchAll(text: string, regex: RegExp): RegExpExecArray[] {
  const res = regex.exec(text);
  if (res == null) {
    return [];
  }
  const startIndex = res.index + res[0].length;
  const restText = text.substr(startIndex);
  const matchs = matchAll(restText, regex);
  matchs.forEach((item) => (item.index += startIndex));
  return [res, ...matchs];
}
