const models = require('../models');

module.exports.cadastrar = async (data, transaction) => models.FechamentoNotificacaoCovid19
  .create(data, { transaction });
