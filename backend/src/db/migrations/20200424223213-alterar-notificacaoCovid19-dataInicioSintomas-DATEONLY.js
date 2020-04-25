
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn('NotificacaoCovid19', 'dataInicioDosSintomas', {
    type: Sequelize.DATEONLY,
  }),
  down: (queryInterface, Sequelize) => queryInterface.changeColumn('NotificacaoCovid19', 'dataInicioDosSintomas',
    {
      type: Sequelize.DATE,
    }),
};
