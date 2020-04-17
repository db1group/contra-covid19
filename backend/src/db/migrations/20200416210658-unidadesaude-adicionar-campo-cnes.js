
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn('UnidadeSaude', 'cnes', {
    type: Sequelize.STRING(20),
    allowNull: false,
  }),

  down: (queryInterface, Sequelize) => queryInterface.changeColumn('UnidadeSaude', 'cnes', {
    type: Sequelize.STRING(20),
    allowNull: false,
    defaultValue: '',
  }),
};
