module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('User', 'keycloakUserId', {
      type: Sequelize.UUID,
      allowNull: true,
      transaction: t,
    }),
    queryInterface.addColumn('User', 'nome', {
      type: Sequelize.STRING(150),
      allowNull: true,
      transaction: t,
    }),
    queryInterface.addColumn('User', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true,
      transaction: t,
    }),
  ])),
  down: (queryInterface) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('User', 'keycloakUserId', { transaction: t }),
    queryInterface.removeColumn('User', 'nome', { transaction: t }),
    queryInterface.removeColumn('User', 'deletedAt', { transaction: t }),
  ])),
};
