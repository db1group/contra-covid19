module.exports = {
  up: (queryInterface) => queryInterface.removeColumn('UnidadeSaude', 'tokenSecretaria'),

  down: (queryInterface, Sequelize) => queryInterface.addColumn('UnidadeSaude', 'tokenSecretaria', {
    type: Sequelize.STRING(1000),
  }),
};
