export default {
  numbersOnly(string) {
    const resultado = string.match(/[0-9]+/g);
    return resultado && resultado.length ? resultado.join([]) : '';
  },
};
