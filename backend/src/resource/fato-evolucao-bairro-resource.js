const models = require('../models');

exports.consultarEvolucaoBairro = async (req, res) => {
  const EvolucaoBairro = await models.EvolucaoBairro.findAll({
    order: [['nomeBairro', 'DESC']],
  });

  return res.json({ data: EvolucaoBairro });
};
