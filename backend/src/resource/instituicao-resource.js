const Sequelize = require('sequelize');
const models = require('../models');

const { Op } = Sequelize;

exports.consultaPorNome = async (req, res) => {
  const { nome } = req.query;
  const instituicoes = await models.Instituicao.findAll({
    where: Sequelize.where(
      Sequelize.fn('upper', Sequelize.col('nome')),
      {
        [Op.like]: `%${nome.toUpperCase()}%`,
      },
    ),
    order: [['nome', 'ASC']],
    limit: 10,
  });

  return res.json({ data: instituicoes });
};
