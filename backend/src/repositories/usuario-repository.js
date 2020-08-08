const models = require('../models');
const AuthAPI = require('../services-api/keycloak/auth');
const UserApi = require('../services-api/keycloak/users');
const { RegraNegocioErro } = require('../lib/erros');

exports.getPorEmail = async (email) => models.User.findOne({
  where: { email },
});

exports.criarUsuario = async (tenant, usuario, includeSupervisor = false) => {
  const {
    nome, email, unidadeSaudeId, permissoes,
  } = usuario;
  const municipioId = tenant;
  const token = await AuthAPI.login().then((t) => t.access_token);

  await UserApi.create(nome.toUpperCase(), email.toLowerCase(), token, tenant);
  const [userKeycloak] = await UserApi.listarUsuarios(email, token);
  if (!userKeycloak) throw new RegraNegocioErro('Ocorreu um erro na criação do usuário.');
  const keycloakUserId = userKeycloak.id;
  await UserApi.joinRoles({
    userId: keycloakUserId, permissions: permissoes, token, includeSupervisor,
  });
  const user = await models.User.create({
    nome, email, keycloakUserId, municipioId,
  });
  if (unidadeSaudeId) {
    await models.UserUnidadeSaude.create({ userId: user.id, unidadeSaudeId });
  }
};
