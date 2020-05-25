const repos = require('../repositories/repository-factory');

exports.adicionarNotificacaoEmLote = async (notificacaoId, transaction) => {
  let lotePendente = await repos.envioSecretariaRepository.getLotePendente(transaction);

  if (!lotePendente) {
    lotePendente = {
      status: 'PENDENTE',
    };

    lotePendente = await repos.envioSecretariaRepository
      .cadastrarLote(lotePendente, transaction);
  }

  let lotePendenteItem = {
    envioSecretariaLoteId: lotePendente.id,
    notificacaoId,
    status: 'PENDENTE',
  };

  lotePendenteItem = await repos.envioSecretariaRepository
    .cadastrarLoteItem(lotePendenteItem, transaction);

  return lotePendenteItem;
};
