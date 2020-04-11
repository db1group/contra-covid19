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

exports.consultarPaginado = async (req, res) => {  
  const { page = 1} = req.query;    
  const limit = 10;
  const offset = (page - 1) * limit;
  const notificacoes = await models.Notificacao.findAndCountAll({  
    include: [
      { model: models.User },
      { model: models.Pessoa },
      { model: models.UnidadeSaude },
      { model: models.ProfissionalSaude },
      { model: models.NotificacaoHistorico },
    ],
    order: [['updatedAt', 'DESC']],
    limit: limit, 
    offset: offset    
  });
  return res.json({data: notificacoes});  
};

exports.consultarPorId = async (req, res) => {  
  const { id } = req.params;
  
  const notificacao = await models.Notificacao.findAll({
    include: { model: models.NotificacaoHistorico },
    where: { id: id }
  });
 
  return res.json({data: notificacao});
};