
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Notificacao', 'profissaoId', {
    type: Sequelize.UUID,
    references: {
      model: 'Profissao',
      key: 'id',
      allowNull: false,
    },
  }),
  down: (queryInterface) => queryInterface.removeColumn('Notificacao', 'profissaoId'),
};
