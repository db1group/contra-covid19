const fs = require('fs');
const path = require('path');

const { isPostgres } = require('../../lib/migration');

const query = (queryInterface, sql, transaction) => queryInterface
  .sequelize
  .query(sql, { raw: true }, { transaction });

const scriptPath = path.resolve(__dirname, '../scripts');
const createView = fs.readFileSync(path.resolve(scriptPath, '20200601203433-atualizar-views-fato-create.sql'), 'utf8');

module.exports = {
  up: (queryInterface) => {
    if (!isPostgres(queryInterface)) return Promise.resolve();
    return queryInterface.sequelize.transaction((t) => Promise.all([
      query(queryInterface, createView, t),
    ])).catch((e) => console.error(e));
  },

  down: () => Promise.resolve(),
};
