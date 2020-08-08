const Sequelize = require('sequelize');
const models = require('../models');
const { RegraNegocioErro } = require('../lib/erros');

const { Op } = Sequelize;

exports.getPorUserEmail = async (email, tenant) => {
  const userUnidadesSaude = models.UserUnidadeSaude.findAll({
    include: [
      {
        model: models.User,
        where: {
          email,
          municipioId: tenant,
        },
      },
      {
        model: models.UnidadeSaude,
      },
    ],
  });

  return userUnidadesSaude.map((userUnidadeSaude) => userUnidadeSaude.UnidadeSaude);
};

exports.getPorId = async (id, tenant) => models.UnidadeSaude.findOne(
  {
    where: { id, municipioId: tenant },
  },
);

const validarCNESUnico = async (cnes, id = null) => {
  const where = { cnes };
  if (id) where.id = { [Op.ne]: id };
  const unidadeSaude = await models.UnidadeSaude.findOne({
    attributes: ['id'],
    where: { ...where },
  });
  return !!unidadeSaude;
};

const cadastraUnidade = async (tenant, unidadeSaude) => {
  const { cnes } = unidadeSaude;
  if (await validarCNESUnico(cnes)) throw new RegraNegocioErro('CNES já cadastrado para outra Unidade de Saúde.');
  const unidade = { ...unidadeSaude };
  unidade.municipioId = tenant;
  return models.UnidadeSaude.create(unidade);
};

exports.validarCNESUnico = validarCNESUnico;
exports.cadastraUnidade = cadastraUnidade;
