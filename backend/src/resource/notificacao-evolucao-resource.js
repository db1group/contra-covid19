const repos = require('../repositories/repository-factory');
const cadastrarNotificacaoEvolucaoService = require('../services/cadastrar-notificacao-evolucao-service');
const deletarNotificacaoEvolucaoService = require('../services/deletar-notificacao-evolucao-service');
const models = require('../models');

exports.consultar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const notificacaoEvolucao = await repos.notificacaoRepository.getEvolucoesPorNotificacaoId(id);
    if (!notificacaoEvolucao) res.status(404).json({ error: 'Notificação não encontrada.' });

    notificacaoEvolucao.NotificacaoEvolucaos = notificacaoEvolucao
      .NotificacaoEvolucaos.sort((a, b) => {
        const dataEvolucaoItemA = new Date(a.dtEvolucao);
        const dataEvolucaoItemB = new Date(b.dtEvolucao);
        return dataEvolucaoItemA - dataEvolucaoItemB;
      });

    return res.json({ data: notificacaoEvolucao });
  } catch (err) {
    return next(err);
  }
};

exports.cadastrar = async (req, res, next) => {
  try {
    const evolucaoRequest = req.body;
    const result = await cadastrarNotificacaoEvolucaoService.handle(evolucaoRequest);

    return res.json({ data: result });
  } catch (err) {
    return next(err);
  }
};

exports.deletar = async (req, res, next) => {
  try {
    const { notificacaoId, id } = req.params;

    await deletarNotificacaoEvolucaoService.handle(notificacaoId, id);

    return res.status(204).json();
  } catch (err) {
    return next(err);
  }
};

exports.alterarEvolucao = async (req, res, next) => {
  try {
    const { notificacaoId, id } = req.params;
    const { createdAt } = req.body;

    await models.NotificacaoEvolucao.update({ createdAt }, {
      where:
        {
          id,
          notificacaoId,
        },
    });

    return res.status(204).json();
  } catch (err) {
    return next(err);
  }
};
