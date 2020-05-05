const session = require('express-session');
const Keycloak = require('keycloak-connect');

const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({ store: memoryStore });

const protectApp = (app) => {
  app.use(keycloak.middleware());
  return keycloak;
};

module.exports = protectApp;
