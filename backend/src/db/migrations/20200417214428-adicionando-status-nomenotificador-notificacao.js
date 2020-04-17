
module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('Notificacao', 'nomeNotificador', {
      type: Sequelize.STRING,
    }),
    queryInterface.addColumn('Notificacao', 'status', {
      type: Sequelize.STRING(9),
      allowNull: false,
      defaultValue: 'ABERTA',
    }),
  ]),
  down: (queryInterface) => Promise.all([
    queryInterface.removeColum('Notificacao', 'nomeNotificador'),
    queryInterface.removeColum('Notificacao', 'status'),
  ]),
};
