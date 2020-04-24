
const Sequelize = require('sequelize');
const models = require('../models');

const { Op } = Sequelize;

exports.consultarBairrosDoMunicipio = async (req, res) => {
  const { municipioId } = req.params;
  const bairros = await models.Bairro.findAll({
    where: { municipioId },
  });

  return res.json({ data: bairros });
};

exports.consultaPorNome = async (req, res) => {
  const { nome } = req.query;
  const municipios = await models.Municipio.findAll({
    where: {
      nome: {
        [Op.like]: `%${nome}%`,
      },
    },
    order: [['nome', 'ASC']],
    limit: 10,
  });

  return res.json({ data: municipios });
};
