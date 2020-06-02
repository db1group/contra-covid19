const Sequelize = require('sequelize');
const models = require('../models');
const tpTransmissaoApiSecretaria = require('../enums/tipo-transmissao-api-secretaria-enum');

const { Op } = Sequelize;

module.exports.cadastrarEvolucao = async (evolucao, transaction) => models.NotificacaoEvolucao
  .create(evolucao, { transaction });

module.exports.getEvolucoesPorNotificacaoId = async (id) => models.Notificacao.findOne({
  where: { id },
  attributes: ['id', 'status'],
  include: [{
    model: models.Pessoa,
    attributes: ['nome', 'tipoDocumento', 'numeroDocumento', 'telefoneResidencial', 'telefoneContato', 'telefoneCelular'],
  },
  { model: models.NotificacaoEvolucao },
  ],
});

module.exports.deletarEvolucaoPorId = async (id, transaction) => {
  models.NotificacaoEvolucao.destroy({
    where: {
      id,
    },
  },
    {
      transaction,
    });
};

module.exports.atualizarEvolucaoPorId = async (evolucao, transaction) => {
  models.NotificacaoEvolucao.update(
    { ...evolucao },
    {
      where: {
        id: evolucao.id,
      },
    },
    {
      transaction,
    },
  );
};

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
    { model: models.NotificacaoEvolucao },
    { model: models.NotificacaoCovid19 },
    { model: models.Municipio },
    { model: models.UnidadeSaude },
    { model: models.User },
    { model: models.ProfissionalSaude },
    { model: models.Profissao },
  ],
});

module.exports.getFechamentosPorNotificacaoId = async (id) => models.NotificacaoEvolucao.findAll({
  where: { notificacaoId: id, dtfechamento: { [Op.ne]: null } },
});

module.exports.getPorPessoaDocumento = async (where) => {
  const { tipoDocumento, numeroDocumento, status = 'ABERTA' } = where;

  return models.Notificacao.findAll({
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
};

exports.atualizar = async (notificacao) => {
  const { id } = notificacao;
  models.Notificacao.update(
    { ...notificacao },
    { where: { id } },
  );
};

exports.getNotificacoesPendentesEnvioSecretariaPorIds = async (ids) => {
  return models.Notificacao.findAll({
    where: {
      id: ids
    },
    include: [
      {
        model: models.Pessoa,
        include: [
          { model: models.Bairro },
          { model: models.Municipio },
          { model: models.Ocupacao },
        ],
      },
      {
        model: models.NotificacaoEvolucao
      },
      {
        model: models.NotificacaoCovid19,
        where: {
          [Op.and]: [
            {
              [Op.or]:
                [
                  {
                    tpTransmissaoApiSecretaria: 
                      tpTransmissaoApiSecretaria.values.PendenteEnvio,
                  },
                  {
                    tpTransmissaoApiSecretaria: 
                      tpTransmissaoApiSecretaria.values.PendenteAtualizacao,
                  },
                  {
                    tpTransmissaoApiSecretaria: null,
                  }
                ]
            }
          ]
        },
      },
      { model: models.Municipio },
      { model: models.UnidadeSaude },
      { model: models.User },
      { model: models.ProfissionalSaude },
      { model: models.Profissao },
    ],
  });
}

exports.getNotificacoesPendentesEnvioSecretaria = async () => {
  return models.NotificacaoCovid19.findAll({
    where: {
      [Op.or]:
        [
          {
            tpTransmissaoApiSecretaria: tpTransmissaoApiSecretaria.values.PendenteEnvio,
          },
          {
            tpTransmissaoApiSecretaria: tpTransmissaoApiSecretaria.values.PendenteAtualizacao,
          },
          {
            tpTransmissaoApiSecretaria: null,
          }
        ],
    },
    attributes: ['id', 'notificacaoId', 'tpTransmissaoApiSecretaria'],
    include: [
      {
        model: models.Notificacao,
        attributes: ['id', 'unidadeSaudeId', 'pessoaId'],
        include: [
          {
            model: models.Pessoa,
            attributes: ['nome']
          },
          {
            model: models.UnidadeSaude,
            attributes: ['nome'],
          },
        ],
      }
    ],
  });
}