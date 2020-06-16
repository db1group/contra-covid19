module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('Notificacao', 'dtSuspeito', {
      type: Sequelize.DATE,
      transaction: t,
    }),
    queryInterface.addColumn('Notificacao', 'dtConfirmado', {
      type: Sequelize.DATE,
      transaction: t,
    }),
    queryInterface.addColumn('Notificacao', 'dtDescartado', {
      type: Sequelize.DATE,
      transaction: t,
    }),
    queryInterface.addColumn('Notificacao', 'dtCurado', {
      type: Sequelize.DATE,
      transaction: t,
    }),
    queryInterface.addColumn('Notificacao', 'dtEncerrado', {
      type: Sequelize.DATE,
      transaction: t,
    }),
    queryInterface.addColumn('Notificacao', 'dtObito', {
      type: Sequelize.DATE,
      transaction: t,
    }),
  ])),
  down: (queryInterface) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Notificacao', 'dtSuspeito', { transaction: t }),
    queryInterface.removeColumn('Notificacao', 'dtConfirmado', { transaction: t }),
    queryInterface.removeColumn('Notificacao', 'dtDescartado', { transaction: t }),
    queryInterface.removeColumn('Notificacao', 'dtCurado', { transaction: t }),
    queryInterface.removeColumn('Notificacao', 'dtEncerrado', { transaction: t }),
    queryInterface.removeColumn('Notificacao', 'dtObito', { transaction: t }),
  ])),
};
