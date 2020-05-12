const { RegraNegocioErro } = require('../lib/erros');
const models = require('../models');
const repos = require('../repositories/repository-factory');

exports.handle = async (notificacaoId, notificacaoEvolucaoId) => {
  const evolucoes = await repos.notificacaoRepository.getEvolucoesPorNotificacaoId(notificacaoId);

  if (evolucoes.length === 1) {
    throw new RegraNegocioErro('Não é permitido remover a primeira evolução.');
  }

  const evolucoesSort = evolucoes.NotificacaoEvolucaos.sort((a, b) => {
    const dataEvolucaoItemA = new Date(a.dtEvolucao);
    const dataEvolucaoItemB = new Date(b.dtEvolucao);
    return dataEvolucaoItemA - dataEvolucaoItemB;
  });

  const ultimaEvolucao = evolucoesSort[evolucoesSort.length - 1];
  if (ultimaEvolucao.id !== notificacaoEvolucaoId) {
    throw new RegraNegocioErro('Somente é permitido remover a última ocorrência de evolução.');
  }

  await models.sequelize.transaction(async (transaction) => {
    await repos.notificacaoRepository.deletarEvolucaoPorId(notificacaoEvolucaoId, transaction);
    await models.Notificacao.update(
      { status: 'ABERTA' },
      {
        where:
                {
                  id: notificacaoId,
                },
        transaction,
      },
    );
  });
};
