const models = require('../models');

exports.consultarEvolucaoDiaria = async (req, res) => {
  const evolucaoDiaria = await models.EvolucaoDiaria.findAll();

  return res.json({ data: evolucaoDiaria });
};
