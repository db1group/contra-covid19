module.exports = {
  async up(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkUpdate('NotificacaoCovid19', {
        tipoLaboratorio: 'OFICIAL',
      }, {
        laboratorioOficial: 1,
      }, {
        transaction,
      });

      await queryInterface.bulkUpdate('NotificacaoCovid19', {
        tipoLaboratorio: 'PRIVADO',
      }, {
        laboratorioRedePrivada: 1,
      }, {
        transaction,
      });

      await queryInterface.removeColumn('NotificacaoCovid19', 'laboratorioOficial', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'laboratorioRedePrivada', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn('NotificacaoCovid19', 'laboratorioOficial', { type: Sequelize.BOOLEAN }, { transaction });
      await queryInterface.addColumn('NotificacaoCovid19', 'laboratorioRedePrivada', { type: Sequelize.BOOLEAN }, { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
