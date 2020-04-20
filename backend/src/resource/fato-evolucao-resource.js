const models = require('../models');

exports.consultarEvolucaoResumo = async (req, res) => {
  const evolucaoResumo = await models.EvolucaoResumo.findAll();

  if (evolucaoResumo && evolucaoResumo.length) {
    return res.json({ data: evolucaoResumo[0] });
  }

  return res.json({ data: {} });
};
