module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Notificacao', 'dtEncerramento', {
    type: Sequelize.DATEONLY,
  }),
  down: (queryInterface) => queryInterface.removeColumn('Notificacao', 'dtEncerramento'),
};
