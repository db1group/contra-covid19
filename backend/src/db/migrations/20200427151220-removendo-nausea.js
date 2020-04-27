module.exports = {
  up: (queryInterface) => queryInterface.removeColumn('NotificacaoCovid19', 'nausea'),
  down: (queryInterface, Sequelize) => queryInterface.addColumn('NotificacaoCovid19', 'nausea', Sequelize.BOOLEAN),
};
