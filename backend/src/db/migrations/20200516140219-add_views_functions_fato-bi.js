const fs = require('fs');
const path = require('path');

const { isPostgres } = require('../../lib/migration');

const query = (queryInterface, sql, transaction) => queryInterface
  .sequelize
  .query(sql, { raw: true }, { transaction });

const scriptPath = path.resolve(__dirname, '../scripts');
const createFatoBi = fs.readFileSync(path.resolve(scriptPath, 'create_fato-bi.sql'), 'utf8');
const dropFatoBi = fs.readFileSync(path.resolve(scriptPath, 'drop_fato-bi.sql'), 'utf8');

module.exports = {
  up: (queryInterface) => {
    if (!isPostgres(queryInterface)) return Promise.resolve();
    return queryInterface.sequelize.transaction((t) => Promise.all([
      query(queryInterface, createFatoBi, t),
    ])).catch((e) => console.error(e));
  },

  down: (queryInterface) => {
    if (!isPostgres(queryInterface)) return Promise.resolve();
    return queryInterface.sequelize.transaction((t) => Promise.all([
      query(queryInterface, dropFatoBi, t),
    ]));
  },
};
