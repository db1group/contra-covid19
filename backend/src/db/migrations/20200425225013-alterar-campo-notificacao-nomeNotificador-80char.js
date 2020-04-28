
module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.changeColumn('Notificacao', 'nomeNotificador', {
      type: Sequelize.STRING(80),
      allowNull: false,
      defaultValue: '',
    }),
  ]),
  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.changeColumn('Notificacao', 'nomeNotificador', {
      type: Sequelize.STRING,
      allowNull: true,
    }),
  ]),
};
