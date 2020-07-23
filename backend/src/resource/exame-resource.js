const Sequelize = require('sequelize');
const models = require('../models');

const { Op } = Sequelize;

exports.consultaPorNome = async (req, res) => {
  const { nome } = req.query;
  const exames = await models.Exame.findAll({
    where:
      Sequelize.where(
        Sequelize.fn('upper', Sequelize.col('nome')),
        {
          [Op.like]: `%${nome.toUpperCase()}%`,
        },
      ),
    limit: 10,
  });

  return res.json({ data: exames });
};
