export default {
  numbersOnly(string) {
    return string.match(/[0-9]+/g).join([]);
  },
};
