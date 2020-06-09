module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('FechamentoNotificacaoCovid19', 'descartados', {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  }),
  down: (queryInterface) => queryInterface.removeColumn('FechamentoNotificacaoCovid19', 'descartados'),
};
