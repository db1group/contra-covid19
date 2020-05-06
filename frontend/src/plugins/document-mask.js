export default {
  /* eslint object-shorthand: ["error", "properties"] */
  install: (Vue) => {
    /* eslint no-param-reassign: ["error", { "props": false }] */
    Vue.filter('FormatDocument', (documentId, documentType) => {
      let docFormated = typeof documentId !== 'string' ? documentId.toString() : documentId;
      if (documentType === 'CPF') {
        docFormated = docFormated.padStart(11, '0');
        docFormated = docFormated.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      }
      return docFormated;
    });
  },
};
