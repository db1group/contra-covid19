module.exports = {
  async up(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkUpdate('NotificacaoCovid19', {
        tipoLaboratorio: 'OFICIAL',
      }, {
        laboratorioOficial: 1,
      });

      await queryInterface.bulkUpdate('NotificacaoCovid19', {
        tipoLaboratorio: 'PRIVADO',
      }, {
        laboratorioRedePrivada: 1,
      });

      await queryInterface.removeColumn('NotificacaoCovid19', 'laboratorioOficial');
      await queryInterface.removeColumn('NotificacaoCovid19', 'laboratorioRedePrivada'); await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn('NotificacaoCovid19', 'laboratorioOficial', { type: Sequelize.BOOLEAN });
      await queryInterface.addColumn('NotificacaoCovid19', 'laboratorioRedePrivada', { type: Sequelize.BOOLEAN });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
