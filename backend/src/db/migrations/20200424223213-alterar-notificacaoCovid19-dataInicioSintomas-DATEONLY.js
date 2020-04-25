
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn('NotificacaoCovid19', 'dataInicioDosSintomas', {
    type: Sequelize.DATEONLY,
    allowNull: false,
  }),
  down: (queryInterface, Sequelize) => queryInterface.changeColumn('NotificacaoCovid19', 'dataInicioDosSintomas',
    {
      type: Sequelize.DATE,
    }),
};
