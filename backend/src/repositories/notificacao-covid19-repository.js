const models = require('../models');

exports.atualizar = async (notificacaoCovid19) => {
  const { notificacaoId } = notificacaoCovid19;
  await models.NotificacaoCovid19.update(
    { notificacaoCovid19 },
    { where: { notificacaoId } },
  );
};
