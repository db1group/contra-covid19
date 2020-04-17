
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('UnidadeSaude', 'cnes', {
    type: Sequelize.STRING(20),
    allowNull: false,
    defaultValue: '',
  }),

  down: (queryInterface) => queryInterface.removeColumn('UnidadeSaude', 'cnes'),
};
