const Sequelize = require('sequelize');
const models = require('../models');

const { Op } = Sequelize;

const METODO_NAO_INFORMADO = '3';

exports.consultaPorNome = async (req, res) => {
  const { metodo = METODO_NAO_INFORMADO, nome } = req.query;
  const exames = await models.Exame.findAll({
    where: {
      [Op.and]: [{ codigoMetodo: metodo },
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
