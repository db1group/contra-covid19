module.exports = {
  up: (queryInterface) => queryInterface.removeColumn('FechamentoNotificacaoCovid19', 'internados'),
  down: (queryInterface, Sequelize) => queryInterface.addColumn('FechamentoNotificacaoCovid19', 'internados', Sequelize.INTEGER),
};
