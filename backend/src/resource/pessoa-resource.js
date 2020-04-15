const models = require("../models");

exports.listar = async (req, res) => {
  const pessoas = await models.Pessoa.findAll({ include: models.Bairro });
  return res.json({ data: pessoas });
};

exports.consultarPorId = async (req, res) => {
  const { id } = req.params;
  const pessoa = await models.Pessoa.findOne({
    where: { id },
    include: {
      model: models.Bairro,
      include: models.Municipio,
    },
  });
  return res.json({ data: pessoa });
};
