const Sequelize = require('sequelize');
const uuid = require('uuid/v4');
const models = require('../models');

const { Op } = Sequelize;

exports.consultaPorNome = async (req, res) => {
  const { nome } = req.query;
  const profissoes = await models.Profissao.findAll({
    where: {
      nome: {
        [Op.like]: `%${nome || '%'}%`,
      },
    },
  });

  return res.json({ data: profissoes });
};

exports.cadastrar = async (req, res) => {
  const { nome } = req.body;
  const id = uuid();
  const profissao = await models.Profissao.create({
    id, nome,
  });
  if (!profissao) return null;
  return res.send(profissao.dataValues);
};
