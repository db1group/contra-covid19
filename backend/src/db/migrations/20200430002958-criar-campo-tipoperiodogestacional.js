module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn('Pessoa', 'tipoPeriodoGestacional', {
        type: Sequelize.STRING(26),
        allowNull: true,
      },
      { transaction });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Pessoa', 'tipoPeriodoGestacional');
  },
};
