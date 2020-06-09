module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('FatoNotificacaoCovid19', 'qtdescartado', {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  }),
  down: (queryInterface) => queryInterface.removeColumn('FechamentoNotificacaoCovid19', 'qtdescartado'),
};
