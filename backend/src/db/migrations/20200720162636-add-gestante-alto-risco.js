module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Pessoa', 'gestanteAltoRisco', {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  }),
  down: (queryInterface) => queryInterface.removeColumn('Pessoa', 'gestanteAltoRisco'),
};
