
module.exports = {
  up(queryInterface) {
    return queryInterface.sequelize.transaction((t) => Promise.all([
      queryInterface.removeColumn('Notificacao', 'bairroId', { transaction: t }),
    ]));
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => Promise.all([
      queryInterface.addColumn('Notificacao', 'bairroId',
        {
          type: Sequelize.UUID,
          references: {
            model: 'Bairro',
            key: 'id',
          },
        },
        { transaction: t }),
    ]));
  },
};
