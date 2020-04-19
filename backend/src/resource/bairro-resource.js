const Sequelize = require('sequelize');
const models = require('../models');

const { Op } = Sequelize;

exports.consultaPorNome = async (req, res) => {
  const { nome } = req.query;
  const bairros = await models.Bairro.findAll({
    where: {
      nome: {
        [Op.like]: `%${nome}%`,
      },
    },
    include: models.Municipio,
    limit: 10,
  });

  return res.json({ data: bairros });
};
