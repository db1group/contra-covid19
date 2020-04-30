export default {
  numbersOnly(string) {
    const resultado = string.match(/[0-9]+/g);
    return resultado && resultado.length ? resultado.join([]) : '';
  },
  telephoneMask(unmaskedString) {
    if (!unmaskedString) return unmaskedString;
    const ddd = unmaskedString.substring(0, 2);
    const firstPart = unmaskedString.substring(2, 6);
    const lastPart = unmaskedString.substring(6);
    return `(${ddd}) ${firstPart}-${lastPart}`;
  },
  cellphoneMask(unmaskedString) {
    if (!unmaskedString) return unmaskedString;
    const ddd = unmaskedString.substring(0, 2);
    const firstPart = unmaskedString.substring(2, 7);
    const lastPart = unmaskedString.substring(7);
    return `(${ddd}) ${firstPart}-${lastPart}`;
  },
  cpfMask(unmaskedString) {
    if (!unmaskedString) return unmaskedString;
    const part1 = unmaskedString.substring(0, 3);
    const part2 = unmaskedString.substring(3, 6);
    const part3 = unmaskedString.substring(6, 9);
    const dv = unmaskedString.substring(9);
    return `${part1}.${part2}.${part3}-${dv}`;
  },
};
