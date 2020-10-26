const models = require('../models');

const isRealmSecretariaSaude = (token) => token.hasRole('realm:SECRETARIA_SAUDE');

exports.isRealmSecretariaSaude = isRealmSecretariaSaude;

exports.isRealmFechamento = (token) => token.hasRole('realm:FECHAMENTO');

exports.isRealmAlteraEvolucao = (token) => token.hasRole('realm:ALTERA_EVOLUCAO');

exports.isRealmEnvioSecretaria = (token) => (
  isRealmSecretariaSaude(token) || token.hasRole('realm:ENVIO_SECRETARIA')
);

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

const isRealmSupervisor = (token) => token.hasRole('realm:SUPERVISOR');
exports.isRealmSupervisor = isRealmSupervisor;

exports.isRealmSecretariaSupervisor = (token) => (
  isRealmSecretariaSaude(token) || isRealmSupervisor(token)
);
