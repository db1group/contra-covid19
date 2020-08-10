const repos = require('../repositories/repository-factory');
const cadastrarNotificacaoEvolucaoService = require('../services/cadastrar-notificacao-evolucao-service');
const deletarNotificacaoEvolucaoService = require('../services/deletar-notificacao-evolucao-service');
const models = require('../models');
const { UsuarioLogado } = require('../secure/usuario-logado');
const { RegraNegocioErro } = require('../lib/erros');

exports.consultar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { tenant } = new UsuarioLogado(req);
    const notificacaoEvolucao = await repos.notificacaoRepository
      .getEvolucoesPorNotificacaoId(id, tenant);
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
    const { tenant } = new UsuarioLogado(req);
    const result = await cadastrarNotificacaoEvolucaoService.handle(evolucaoRequest, tenant);

    return res.json({ data: result });
  } catch (err) {
    return next(err);
  }
};

exports.deletar = async (req, res, next) => {
  try {
    const { notificacaoId, id } = req.params;
    const { tenant } = new UsuarioLogado(req);
    await deletarNotificacaoEvolucaoService.handle(notificacaoId, id, tenant);

    return res.status(204).json();
  } catch (err) {
    return next(err);
  }
};

exports.alterarEvolucao = async (req, res, next) => {
  try {
    const { notificacaoId, id } = req.params;
    const { createdAt } = req.body;
    const { tenant } = new UsuarioLogado(req);
    const evolucao = await models.NotificacaoEvolucao.findOne({
      where: { id, notificacaoId },
      includes: {
        model: models.Notificacao,
        where: { municipioId: tenant },
      },
    });
    if (!evolucao) throw new RegraNegocioErro('Evolução não encontrada.');

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
