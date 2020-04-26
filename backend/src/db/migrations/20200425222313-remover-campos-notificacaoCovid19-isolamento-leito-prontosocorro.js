module.exports = {
  async up(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('NotificacaoCovid19', 'isolamentoDomiciliar', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'leitoComum', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'leitoUti', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'prontoSocorroOuAtendimento', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn('NotificacaoCovid19', 'isolamentoDomiciliar', { type: Sequelize.BOOLEAN }, { transaction });
      await queryInterface.addColumn('NotificacaoCovid19', 'leitoComum', { type: Sequelize.BOOLEAN }, { transaction });
      await queryInterface.addColumn('NotificacaoCovid19', 'leitoUti', { type: Sequelize.BOOLEAN }, { transaction });
      await queryInterface.addColumn('NotificacaoCovid19', 'prontoSocorroOuAtendimento', { type: Sequelize.BOOLEAN }, { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
