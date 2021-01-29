const models = require('../models');

exports.salvar = async (taxa) => models.Taxa.create(taxa);

exports.findByDataFechamento = async (dtfechamento) => models.Taxa.findOne({
  where: { dtfechamento },
});
