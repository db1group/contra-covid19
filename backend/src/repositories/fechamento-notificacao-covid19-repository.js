const models = require('../models');

module.exports.cadastrar = async (data, transaction) => models.FechamentoNotificacaoCovid19
  .create(data, { transaction });

module.exports.atualizar = async (id, data, transaction) => models.FechamentoNotificacaoCovid19
  .update(data, { where: { id }, transaction });

module.exports.delete = async (id, transaction) => models.FechamentoNotificacaoCovid19
  .destroy({ where: { id }, transaction });
