module.exports = {
  up: (queryInterface) => queryInterface.removeColumn('FechamentoNotificacaoCovid19', 'confirmadosInternados'),
  down: (queryInterface, Sequelize) => queryInterface.addColumn('FechamentoNotificacaoCovid19', 'confirmadosInternados', Sequelize.INTEGER),
};
