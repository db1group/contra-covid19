const models = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { mapearParaNotificacao, mapearParaRequest } = require("../mapper/notificacao-mapper");
const uuid = require("uuid/v4")

exports.salvar = async (req, res) => {
  const notificacaoId = uuid();
  let notificacao = mapearParaNotificacao(req.body);

  notificacao = {
    id: notificacaoId,
    ...notificacao,
    notificacaoHistorico: {
      id: uuid(),
      notificacaoId,
      ...notificacao.notificacaoHistorico
    }
  };

  const notificacaoSalva = await models.Notificacao.create(notificacao);
  const notificacaoHistoricoSalvo = await models.NotificacaoHistorico.create(notificacao.notificacaoHistorico);

  const retorno = mapearParaRequest(notificacaoSalva, notificacaoHistoricoSalvo);

  return res.json({
    data: {
      ...retorno,
    }
  })
};

exports.consultarPorData = async (req, res) => {
  console.log(req.params);
  const notiticacoes = [];

  return res.json({ data: notiticacoes });
};

exports.consultarPorId = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const notificacaoModel = await models.Notificacao.findOne({
    where: { id },
    include: [
      { model: models.Pessoa },
      { model: models.NotificacaoHistorico }
    ]
  });

  const { notificacaoHistorico, ...notificacao } = notificacaoModel;

  const retorno = mapearParaRequest(notificacaoModel, notificacaoModel.NotificacaoHistorico);

  return res.json({ data: retorno });
};