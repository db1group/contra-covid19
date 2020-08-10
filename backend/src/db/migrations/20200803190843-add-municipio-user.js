module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('User', 'municipioId', {
    type: Sequelize.UUID,
    references: {
      model: 'Municipio',
      key: 'id',
    },
  }),
  down: (queryInterface) => queryInterface.removeColumn('User', 'municipioId'),
};
