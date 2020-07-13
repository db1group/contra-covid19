const session = require('express-session');
const Keycloak = require('keycloak-connect');

const memoryStore = new session.MemoryStore();

const kcConfig = {
  realm: process.env.KEYCLOAK_REALM,
  'auth-server-url': process.env.KEYCLOAK_URL || '',
  'ssl-required': 'external',
  resource: process.env.KEYCLOAK_REALM,
  'public-client': true,
  'confidential-port': 0,
  'verify-token-audience': true,
  'use-resource-role-mappings': true,
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
  console.info(kcConfig);
  keycloak = new Keycloak({ store: memoryStore }, kcConfig);
};

const protectApp = (app) => {
  if (keycloak) return keycloak;
  initKeycloak(app);
  app.use(keycloak.middleware());
  return keycloak;
};

module.exports = protectApp;
