const models = require('../models');

exports.getPorUserEmail = async (email) => {
  const userUnidadesSaude = models.UserUnidadeSaude.findAll({
    include: [
      {
        model: models.User,
        where: {
          email,
        },
      },
      {
        model: models.UnidadeSaude,
      },
    ],
  });

  return userUnidadesSaude.map((userUnidadeSaude) => userUnidadeSaude.UnidadeSaude);
};

exports.getPorId = async (id, transaction) => models.UnidadeSaude.findOne(
  {
    where: { id },
  },
  {
    transaction,
  },
);
