module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('Exame', 'ativo', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    }),
  ]),

  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('Exame', 'ativo', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
