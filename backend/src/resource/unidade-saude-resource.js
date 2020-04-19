const Sequelize = require('sequelize');
const models = require('../models');

const { Op } = Sequelize;

exports.consultaPorNome = async (req, res) => {
  const { nome } = req.query;
  const unidadesSaude = await models.UnidadeSaude.findAll({
    where: {
      nome: {
        [Op.like]: `%${nome}%`,
      },
    },
    limit: 10,
  });

  return res.json({ data: unidadesSaude });
};
