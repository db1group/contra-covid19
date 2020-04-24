const { Sequelize } = require('sequelize');
const models = require('../models');

const { Op } = Sequelize;

exports.consultaPorDescricao = async (req, res) => {
  const { descricao } = req.query;
  const ocupacoes = await models.Ocupacao.findAll({
    where: {
      descricao: {
        [Op.like]: `%${descricao || '%'}%`,
      },
    },
  });

  return res.json({ data: ocupacoes });
};
