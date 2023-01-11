export function isNumber(text: string) {
  if (text.toString().includes('.')) {
    return /(^\d+)\.(\d+$)/.test(text);
  }
  return /(^\d+$)/.test(text);
}
