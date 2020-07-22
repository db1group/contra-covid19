const rolesAuth = require('./roles');

class UsuarioLogado {
  constructor(req) {
    const { email } = req.kauth.grant.access_token.content;
    const { roles } = req.kauth.grant.access_token.content.realm_access;
    this.email = email;
    this.roles = roles;
  }

  isRoleSecretariaSaude() {
    return this.roles.some((data) => data === rolesAuth.values.SecretariaSaude);
  }

  isRoleVisualizaNotificacoes() {
    return this.roles.some((data) => data === rolesAuth.values.VisualizaNotificacoes);
  }

  isRoleFechamento() {
    return this.roles.some((data) => data === rolesAuth.values.Fechamento);
  }

  isRoleAlteraEvolucao() {
    return this.roles.some((data) => data === rolesAuth.values.AlteraEvolucao);
  }

  isRoleEnvioSecretaria() {
    return this.roles.some((data) => data === rolesAuth.values.EnvioSecretaria);
  }
}

module.exports.UsuarioLogado = UsuarioLogado;
