/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);

module.exports = (app) => {
  fs.readdirSync(__dirname)
    .filter((file) => (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    ))
    .forEach((file) => {
      // eslint-disable-next-line import/no-dynamic-require
      const route = require(path.join(__dirname, file));
      app.use('/api', route);
    });
  // Endpoint para o Docker/AWS
  app.use(require('./health'));

  return app;
};
