module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn('Notificacao', 'status', {
    type: Sequelize.STRING(18),
    defaultValue: 'ABERTO',
  }),
  down: (queryInterface, Sequelize) => queryInterface.changeColumn('Notificacao', 'status', {
    type: Sequelize.STRING(9),
    defaultValue: 'ABERTA',
  }),
};
