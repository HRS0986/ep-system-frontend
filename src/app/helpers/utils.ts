// This function can check if an object is instance of an interface
export function isTypeMatched(data: object, keys: string[]): boolean {
  debugger;
  const optionalKeys = keys.filter(k => k.includes('?'));
  if (data === undefined) return false;
  let keysOfObject = Object.keys(data);
  const checkedKeys = keysOfObject.filter(value => keys.includes(value)).sort();
  keys = keys.sort();
  const checkedKeysString = checkedKeys.join('');
  const keysString = keys.join('');
  if (keysString != checkedKeysString) {
    const diffKeys = keys.filter(k => !checkedKeys.includes(k));
    const isMatched = diffKeys.every(k => optionalKeys.includes(k));
    return isMatched;
  }
  return true;
}
