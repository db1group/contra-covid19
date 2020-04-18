const models = require('../models');

exports.consultarBairrosDoMunicipio = async (req, res) => {
  const { municipioId } = req.params;
  const bairros = await models.Bairro.findAll({
    where: { municipioId },
  });

  return res.json({ data: bairros });
};
