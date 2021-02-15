const models = require('../models');

exports.salvar = async (taxa) => models.Taxa.create(taxa);

exports.update = async (taxa) => {
  const { id } = taxa;
  return models.Taxa.update(
    { ...taxa },
    { where: { id } },
  );
};

exports.findByDataFechamento = async (dtfechamento) => models.Taxa.findOne({
  where: { dtfechamento },
});
