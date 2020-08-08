module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.changeColumn('FechamentoNotificacaoCovid19', 'dataFechamento', {
      type: Sequelize.DATEONLY,
    }),
  ]),
  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.changeColumn('FechamentoNotificacaoCovid19', 'dataFechamento', {
      type: Sequelize.DATE,
    }),
  ]),
};
