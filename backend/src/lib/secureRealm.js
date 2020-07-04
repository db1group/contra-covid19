const models = require('../models');

exports.isRealmSecretariaSaude = (token) => token.hasRole('realm:SECRETARIA_SAUDE');

exports.isRealmFechamento = (token) => token.hasRole('realm:FECHAMENTO');

exports.isRealSecretariaOuUnidadeSaude = async (token, req) => {
  if (token.hasRole('realm:SECRETARIA_SAUDE')) return true;
  const { id } = req.params;
  if (!id) return false;
  const { email } = token.content;
  const unidadeSaude = await models.UserUnidadeSaude.findOne({
    attributes: ['id'],
    include: [
      {
        attributes: ['id', 'email'],
        model: models.User,
        where: {
          email,
        },
      },
      {
        model: models.UnidadeSaude,
        attributes: ['id'],
        where: {
          id,
        },
      },
    ],
  });
  return !!unidadeSaude;
};
