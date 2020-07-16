const models = require('../models');
// const tpTransmissaoApiSecretariaEnum = require('../enums/tipo-transmissao-api-secretaria-enum');

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
      tpTransmissaoApiSecretaria,
      apiSecretariaId,
    },
    {
      where:
      {
        id: notificacaoCovid19Id,
      },
    },
  );
};

exports.atualizarTpTransmissaoPendenteAtualizacao = async (/* notificacaoId, transaction */) => {
  /*
  const covid19 = await models.NotificacaoCovid19.findOne({ where: { notificacaoId } });
  if (covid19.tpTransmissaoApiSecretaria !== tpTransmissaoApiSecretariaEnum.values.Enviada) return;
  models.NotificacaoCovid19.update(
    {
      tpTransmissaoApiSecretaria: tpTransmissaoApiSecretariaEnum.values.PendenteAtualizacao,
    },
    {
      where: { notificacaoId },
    },
    {
      transaction,
    },
  );
  */
};
