
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Pessoa', 'municipioId', {
    type: Sequelize.UUID,
    references: {
      model: 'Municipio',
      key: 'id',
      allowNull: false,
    },
  }),
  down: (queryInterface) => queryInterface.removeColumn('Pessoa', 'municipioId'),
};
