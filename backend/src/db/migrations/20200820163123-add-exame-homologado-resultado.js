module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn('ResultadoExame', 'codigoExame', {
        type: Sequelize.STRING(18),
        transaction,
      });
      await queryInterface.addColumn('ResultadoExame', 'homologado', {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        transaction,
      });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('ResultadoExame', 'codigoExame', { transaction });
      await queryInterface.removeColumn('ResultadoExame', 'homologado', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
