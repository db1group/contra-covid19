const models = require('../models');

exports.consultarEvolucaoDiaria = async (req, res) => {
  const evolucaoDiaria = await models.EvolucaoDiaria.findAll({
    order: ['dataEvolucao'],
  });

  return res.json({ data: evolucaoDiaria });
};
