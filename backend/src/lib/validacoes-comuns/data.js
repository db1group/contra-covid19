const validarMenorQueDataHoraAtual = (value, artigo, nomeCampo) => {
  const dataInserida = new Date(value);
  const dataHoraAtual = new Date();
  if (dataInserida >= dataHoraAtual) {
    throw new Error(`${artigo} ${nomeCampo} não pode ser maior que a data atual`);
  }
};

const validarMenorQueDataAtual = (value, artigo, nomeCampo) => {
  const dataInserida = new Date(value);
  const dataHoraAtual = new Date();
  const dataAtual = new Date(
    dataHoraAtual.getFullYear(),
    dataHoraAtual.getMonth(),
    dataHoraAtual.getDate(),
  );
  if (dataInserida >= dataAtual) {
    const mensagemErro = `${artigo} ${nomeCampo} não pode ser maior que a data atual`;
    throw new Error(mensagemErro);
  }
};

module.exports = { validarMenorQueDataAtual, validarMenorQueDataHoraAtual };
