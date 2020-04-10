const models = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.consultaPorNome = async (req, res) => {
  const { nome } = req.query;
  const bairros = await models.Bairro.findAll({
    where: {
      nome: {
        [Op.like]: `%${nome}%`
      }
    },
    limit: 10
  });

  return res.json({data: bairros});
};
