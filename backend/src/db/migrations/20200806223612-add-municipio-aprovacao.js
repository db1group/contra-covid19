module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('AprovacaoDado', 'municipioId', {
    type: Sequelize.UUID,
    references: {
      model: 'Municipio',
      key: 'id',
    },
  }),
  down: (queryInterface) => queryInterface.removeColumn('AprovacaoDado', 'municipioId'),
};
