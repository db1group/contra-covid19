module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('Pessoa', 'passaporte', {
      type: Sequelize.STRING(20),
      transaction: t,
    }),
    queryInterface.addColumn('Pessoa', 'paisId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Pais',
        key: 'id',
      },
      allowNull: true,
      transaction: t,
    }),
  ])),
  down: (queryInterface) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Pessoa', 'passaporte', { transaction: t }),
    queryInterface.removeColumn('Pessoa', 'paisId', { transaction: t }),
  ])),
};
