export function toCamelCase(str) {
  let newStr = str.replace(/\W+(.)/g, function(match, chr) {
    return chr.toUpperCase();
  });
  newStr = newStr.charAt(0).toLowerCase() + newStr.slice(1);
  return newStr;
}
