const models = require('../models');
const { normalizarTexto } = require('../lib/normalizar-texto');

exports.atualizar = async (pessoa) => {
  const { id } = pessoa;

  models.Pessoa.update(
    { ...pessoa },
    { where: { id } },
  );
};

exports.get = async (nome, nomeDaMae) => models.Pessoa.findAll({
  where: {
    nome: normalizarTexto(nome),
    nomeDaMae: normalizarTexto(nomeDaMae),
  },
});

exports.getPorDocumento = async ({ tipoDocumento, numeroDocumento }, transaction) => {
  if (!tipoDocumento || tipoDocumento.trim() === '') return null;
  if (!numeroDocumento || numeroDocumento.trim() === '') return null;
  return models.Pessoa.findOne({
    where: {
      tipoDocumento,
      numeroDocumento,
    },
  },
  {
    transaction,
  });
};

exports.cadastrar = async (pessoa) => models.Pessoa.create(pessoa);
