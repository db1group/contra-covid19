const Sequelize = require('sequelize');
const models = require('../models');

const { Op } = Sequelize;

module.exports.getPorId = async (id) => models.Notificacao.findOne({
  where: { id },
  include: [
    {
      model: models.Pessoa,
      include: [
        { model: models.Bairro },
        { model: models.Municipio },
        { model: models.Ocupacao },
      ],
    },
    { model: models.NotificacaoCovid19 },
    { model: models.Municipio },
    { model: models.UnidadeSaude },
    { model: models.User },
    { model: models.ProfissionalSaude },
    { model: models.Profissao },
  ],
});

module.exports.getPorPessoaDocumento = async (tipoDocumento, numeroDocumento, status) => {
  const notificacao = await models.Notificacao.count({
    where: {
      status,
    },
    include: {
      model: models.Pessoa,
      where: {
        [Op.and]: [{
          tipoDocumento,
        }, {
          numeroDocumento,
        }],
      },
      attributes: ['tipoDocumento', 'numeroDocumento'],
    },
  });

  return notificacao > 0;
};

exports.atualizar = async (notificacao) => {
  const { id } = notificacao;
  await models.Notificacao.update(
    { notificacao },
    { where: { id } },
  );
};
