const Sequelize = require('sequelize');
const models = require('../models');

const { Op } = Sequelize;

exports.consultaPorNome = async (req, res) => {
  const { nome } = req.query;
  const exames = await models.Exame.findAll({
    where: {
      [Op.and]: [{ ativo: true },
        Sequelize.where(
          Sequelize.fn('upper', Sequelize.col('nome')),
          {
            [Op.like]: `%${nome.toUpperCase()}%`,
          },
        )],
    },
  });

  return res.json({ data: exames });
};
