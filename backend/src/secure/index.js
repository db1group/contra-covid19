const session = require('express-session');
const Keycloak = require('keycloak-connect');

const memoryStore = new session.MemoryStore();
const kcConfig = {
  realm: 'notificasaude',
  'auth-server-url': process.env.KEYCLOAK_URL || 'https://qa-auth.notificasaude.com.br/auth',
  'ssl-required': 'external',
  resource: 'notificasaude',
  'public-client': true,
  'confidential-port': 0,
  'bearer-only': true,
};

const keycloak = new Keycloak({ store: memoryStore }, kcConfig);

const protectApp = (app) => {
  app.use(keycloak.middleware());
  return keycloak;
};

module.exports = protectApp;
