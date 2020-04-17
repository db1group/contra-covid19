'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Pessoa', 'gestante', {
        type: Sequelize.STRING(12)
      }),
      queryInterface.addColumn('Pessoa', 'racaCor', {
        type: Sequelize.STRING(10)
      })
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Pessoa', 'gestante'),
      queryInterface.removeColumn('Pessoa', 'racaCor')
    ]);
  }
};
