
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Pessoa', 'ocupacaoId', {
    type: Sequelize.UUID,
    references: {
      model: 'Ocupacao',
      key: 'id',
      allowNull: false,
    },
  }),
  down: (queryInterface, Sequelize) => Sequelize.removeColumn('Pessoa', 'ocupacaoId'),
};
