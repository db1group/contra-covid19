const models = require('../models');

exports.cadastrar = async (data, transaction) => models.FechamentoNotificacaoCovid19
  .create(data, { transaction });

exports.atualizar = async (id, data, transaction) => models.FechamentoNotificacaoCovid19
  .update(data, { where: { id }, transaction });

exports.delete = async (id, transaction) => models.FechamentoNotificacaoCovid19
  .destroy({ where: { id }, transaction });

exports.deleteByData = async (tenant, dataFato, transaction) => models.FechamentoNotificacaoCovid19
  .destroy({ where: { municipioId: tenant, dtFato: dataFato }, transaction });
