const models = require('../models');

exports.atualizar = async (notificacaoCovid19) => {
  const { notificacaoId } = notificacaoCovid19;
  models.NotificacaoCovid19.update(
    { ...notificacaoCovid19 },
    { where: { notificacaoId } },
  );
};

exports.atualizarTpTransmissaoApiSecretaria = async (
  notificacaoCovid19Id,
  apiSecretariaId, tpTransmissaoApiSecretaria) => {
  models.NotificacaoCovid19.update(
    {
      tpTransmissaoApiSecretaria: tpTransmissaoApiSecretaria,
      apiSecretariaId: apiSecretariaId
    },
    {
      where:
      {
        id: notificacaoCovid19Id
      }
    },
  );
}