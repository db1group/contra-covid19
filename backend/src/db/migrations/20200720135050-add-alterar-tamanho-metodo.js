module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn('NotificacaoCovid19', 'metodoDeExame', {
    type: Sequelize.STRING(20),
  }),
  down: (queryInterface, Sequelize) => queryInterface.changeColumn('NotificacaoCovid19', 'metodoDeExame',
    {
      type: Sequelize.STRING(16),
    }),
};
