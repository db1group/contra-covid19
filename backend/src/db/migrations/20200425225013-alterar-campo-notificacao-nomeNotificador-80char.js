
module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.changeColumn('NotificacaoCovid19', 'nomeNotificador', {
      type: Sequelize.STRING(80),
      allowNull: false,
      defaultValue: '',
    }),
  ]),
  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.changeColumn('NotificacaoCovid19', 'nomeNotificador', {
      type: Sequelize.STRING,
      allowNull: true,
    }),
  ]),
};
