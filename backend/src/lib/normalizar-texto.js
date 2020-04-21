const removerAcentos = require('./remover-acentos');

exports.normalizarTexto = (palavra) => {
  const palavraSemAcento = removerAcentos(palavra);
  return palavraSemAcento.toUpperCase();
};
