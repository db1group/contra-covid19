
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Notificacao', 'municipioId', {
    type: Sequelize.UUID,
    references: {
      model: 'Municipio',
      key: 'id',
      allowNull: false,
    },
  }),
  down: (queryInterface) => queryInterface.removeColumn('Notificacao', 'municipioId'),
};
