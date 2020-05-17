const fs = require('fs');
const path = require('path');

const { isPostgres } = require('../../lib/migration');

const query = (queryInterface, sql, transaction) => queryInterface
  .sequelize
  .query(sql, { raw: true }, { transaction });

const scriptPath = path.resolve(__dirname, '../scripts');
const createFatoBi = fs.readFileSync(path.resolve(scriptPath, '20200516140219-add_views_functions_fato-bi-create.sql'), 'utf8');
const dropFatoBi = fs.readFileSync(path.resolve(scriptPath, '20200516140219-add_views_functions_fato-bi-drop.sql'), 'utf8');

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
