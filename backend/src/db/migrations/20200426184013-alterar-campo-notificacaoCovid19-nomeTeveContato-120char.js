
module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.changeColumn('NotificacaoCovid19', 'nomeTeveContato', {
      type: Sequelize.STRING(120),
      allowNull: true,
    }),
  ]),
  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.changeColumn('NotificacaoCovid19', 'nomeTeveContato', {
      type: Sequelize.STRING,
    }),
  ]),
};
