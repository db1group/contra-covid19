module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('UnidadeSaude', 'tpUnidade', {
    type: Sequelize.STRING(15),
    defaultValue: 'OUTRO',
  }),
  down: (queryInterface) => queryInterface.removeColumn('UnidadeSaude', 'tpUnidade'),
};
