export default {
  /* eslint object-shorthand: ["error", "properties"] */
  install: (Vue) => {
    /* eslint no-param-reassign: ["error", { "props": false }] */
    Vue.filter('FormatPhone', (phone) => {
      let phoneFormated = typeof phone !== 'string' ? phone.toString() : phone;
      phoneFormated = phoneFormated.replace(/^(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
      return phoneFormated;
    });
  },
};
