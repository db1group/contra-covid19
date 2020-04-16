'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameTable('NotificacaoHistorico', 'NotificacaoCovid19')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameTable('NotificacaoCovid19', 'NotificacaoHistorico')
  }
};
