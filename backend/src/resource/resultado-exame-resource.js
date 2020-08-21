const Sequelize = require('sequelize');
const models = require('../models');

const { Op } = Sequelize;

const EXAME_NAO_INFORMADO = '3';

exports.consultaPorNome = async (req, res) => {
  const { exame = EXAME_NAO_INFORMADO, nome } = req.query;
  const exames = await models.ResultadoExame.findAll({
    where: {
      [Op.and]: [{ codigoExame: exame },
        Sequelize.where(
          Sequelize.fn('upper', Sequelize.col('nome')),
          {
            [Op.like]: `%${nome.toUpperCase()}%`,
          },
        ),
      ],
    },
  });

  return res.json({ data: exames });
};
