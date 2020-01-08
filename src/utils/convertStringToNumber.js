export function convertStringToNumber(i) {
  if (i != undefined) {
    let v = i.replace(/\./g, "");
    v = v.replace(",", ".");
    return parseFloat(v);
  }
}
