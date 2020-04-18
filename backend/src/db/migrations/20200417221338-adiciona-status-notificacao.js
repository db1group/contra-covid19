module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Notificacao', 'status', {
    type: Sequelize.STRING(18),
    defaultValue: 'ABERTO',
  }),
  down: (queryInterface) => queryInterface.removeColumn('Notificacao', 'status'),
};
