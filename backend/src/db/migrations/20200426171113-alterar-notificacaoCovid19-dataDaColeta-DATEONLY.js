
module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.changeColumn('NotificacaoCovid19', 'dataDaColeta', {
      type: Sequelize.DATEONLY,
      allowNull: true,
    }),
  ]),
  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.changeColumn('NotificacaoCovid19', 'dataDaColeta', {
      type: Sequelize.DATE,
    }),
  ]),
};
