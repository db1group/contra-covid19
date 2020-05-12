const session = require('express-session');
const Keycloak = require('keycloak-connect');

const memoryStore = new session.MemoryStore();

const keycloakURL = process.env.NODE_ENV === 'prod'
  ? 'https://auth.notificasaude.com.br/auth'
  : 'https://qa-auth.notificasaude.com.br/auth';

const kcConfig = {
  realm: 'notificasaude',
  'auth-server-url': process.env.KEYCLOAK_URL || keycloakURL,
  'ssl-required': 'external',
  resource: 'notificasaude',
  'public-client': true,
  'confidential-port': 0,
  'bearer-only': true,
};

let keycloak;

const initKeycloak = (app) => {
  app.use(session({
    secret: process.env.SECRET_SESSION || '5125a58efebcf5cbad9ef2daa1d60afc',
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  }));

  keycloak = new Keycloak({ store: memoryStore }, kcConfig);
};

const protectApp = (app) => {
  if (keycloak) return keycloak;
  initKeycloak(app);
  app.use(keycloak.middleware());
  return keycloak;
};

module.exports = protectApp;
