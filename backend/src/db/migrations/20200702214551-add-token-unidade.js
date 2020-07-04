module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('UnidadeSaude', 'tokenSecretaria', {
    type: Sequelize.STRING(1000),
  }),

  down: (queryInterface) => queryInterface.removeColumn('UnidadeSaude', 'tokenSecretaria'),
};
