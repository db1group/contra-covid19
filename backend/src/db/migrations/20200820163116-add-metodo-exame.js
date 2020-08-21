module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Exame', 'codigoMetodo', {
    type: Sequelize.STRING(18),
  }),
  down: (queryInterface) => queryInterface.removeColumn('Exame', 'codigoMetodo'),
};
