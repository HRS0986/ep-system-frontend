// This function can check if an object is instance of an interface
export function isTypeMatched(data: object, keys: string[]): boolean {
  debugger;
    if (data === undefined) return false;
    let keysOfObject = Object.keys(data);
    const checkedKeysString = keysOfObject.filter(value => keys.includes(value)).sort().join('');
    const keysString = keys.sort().join('');
    return keysString == checkedKeysString;
}
