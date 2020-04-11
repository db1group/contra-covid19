const models = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { mapearParaNotificacao, mapearParaResponse } = require("../mapper/notificacao-mapper");
const uuid = require("uuid/v4")

exports.salvar = async (req, res) => {

  let notificacao = mapearParaNotificacao(req.body);

  const notificacaoSalva = await salvarNotificacao(notificacao);

  const retorno = mapearParaResponse(notificacaoSalva, notificacaoSalva.NotificacaoHistorico);

  return res.json({
    data: {
      ...retorno,
    }
  })
};

exports.consultarPaginado = async (req, res) => {
  const { page = 1 } = req.query;
  const limit = 10;
  const notificacoes = await consultarNotificaoesPaginado(page, limit);

  const notificacoesResponse = [];
  notificacoes.rows.map(notificacao =>
    notificacoesResponse.push(mapearParaResponse(notificacao, notificacao.NotificacaoHistorico))
  );

  return res.json({ count: notificacoes.count, data: notificacoesResponse });
};

exports.consultarPorId = async (req, res) => {
  const { id } = req.params;
  const notificacaoModel = await consultarNotificacaoPorId(id);

  const retorno = mapearParaResponse(notificacaoModel, notificacaoModel.NotificacaoHistorico);

  return res.json({ data: retorno });
};

const consultarNotificacaoPorId = async (id) =>
  await models.Notificacao.findOne({
    where: { id },
    include: [
      { model: models.Pessoa },
      { model: models.NotificacaoHistorico }
    ]
  });

const salvarNotificacao = async (notificacao) => {
  const notificacaoId = uuid();
  const notificacaoComId = {
    id: notificacaoId,
    ...notificacao,
    notificacaoHistorico: {
      id: uuid(),
      notificacaoId,
      ...notificacao.notificacaoHistorico
    }
  };

  await models.Notificacao.create(notificacaoComId);
  await models.NotificacaoHistorico.create(notificacaoComId.notificacaoHistorico);
  return await consultarNotificacaoPorId(notificacaoId);
}

const consultarNotificaoesPaginado = async (page, limit) => {
  const offset = (page - 1) * limit;
  return await models.Notificacao.findAndCountAll({
    include: [
      { model: models.Pessoa },
      { model: models.NotificacaoHistorico },
    ],
    order: [['updatedAt', 'DESC']],
    limit: limit,
    offset: offset
  });
}
