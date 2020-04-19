
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('Notificacao', 'nomeNotificador', {
      type: Sequelize.STRING,
    }, { transaction: t }),
    queryInterface.addColumn('Notificacao', 'status', {
      type: Sequelize.STRING(9),
      allowNull: false,
      defaultValue: 'ABERTA',
    }, { transaction: t }),
  ])),
  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('Notificacao', 'nomeNotificador', { transaction });
      await queryInterface.removeColumn('Notificacao', 'status', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
