const repos = require('../repositories/repository-factory');
const cadastrarNotificacaoEvolucaoSerivce = require('../services/cadastrar-notificacao-evolucao-service');

exports.consultar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const notificacaoEvolucao = await repos.notificacaoRepository.getEvolucoesPorNotificacaoId(id);

    if (!notificacaoEvolucao) res.status(404).json({ error: 'Notificação não encontrada.' });

    return res.json({ data: notificacaoEvolucao });
  } catch (err) {
    return next(err);
  }
};

exports.cadastrar = async (req, res, next) => {
  try {
    const evolucaoRequest = req.body;

    const result = await cadastrarNotificacaoEvolucaoSerivce.handle(evolucaoRequest);

    return res.json({ data: result });
  } catch (err) {
    return next(err);
  }
};
