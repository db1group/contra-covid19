const Sequelize = require('sequelize');
const models = require('../models');

const { Op } = Sequelize;

exports.consultaPorNome = async (req, res) => {
  const nome = req.query.nome || '';
  const perfis = await models.Perfil.findAll({
    where: {
      nome: {
        [Op.like]: `%${nome}%`,
      },
    },
  });

  return res.json({ data: perfis });
};

exports.cadastrar = async (req, res) => {
  const perfil = req.body;
  await models.Perfil.create(perfil);
  return res.status(204).send();
};
