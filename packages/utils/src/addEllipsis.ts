export function addEllipsis(text: string, length: number) {
  if (text.length > length) {
    return `${text.substr(0, length)}...`;
  }

  return text;
}
