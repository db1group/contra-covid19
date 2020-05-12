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
}

module.exports.UsuarioLogado = UsuarioLogado;
