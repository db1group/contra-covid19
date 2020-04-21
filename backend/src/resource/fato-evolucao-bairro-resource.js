const models = require('../models');

exports.consultarEvolucaoBairro = async (req, res) => {
  const EvolucaoBairro = await models.EvolucaoBairro.findAll();

  return res.json({ data: EvolucaoBairro });
};
