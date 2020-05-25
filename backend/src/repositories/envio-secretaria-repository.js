const models = require('../models');

exports.getLotePendente = async (transaction) => models.EnvioSecretariaLote.findOne({
  where:
  {
    status: 'PENDENTE',
  },
}, { transaction });

exports.cadastrarLote = async (data, transaction) => models.EnvioSecretariaLote
  .create(data, { transaction });

exports.cadastrarLoteItem = async (data, transaction) => models.EnvioSecretariaLoteItem
  .create(data, { transaction });
