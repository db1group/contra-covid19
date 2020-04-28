
module.exports = {
  async up(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('NotificacaoCovid19', 'medicacaoAntitermica');
      await queryInterface.removeColumn('NotificacaoCovid19', 'nomeMedicacaoAntitermica');
      await queryInterface.removeColumn('NotificacaoCovid19', 'medicacaoAnalgesica');
      await queryInterface.removeColumn('NotificacaoCovid19', 'nomeMedicacaoAnalgesica');
      await queryInterface.removeColumn('NotificacaoCovid19', 'medicacaoAntiviral');
      await queryInterface.removeColumn('NotificacaoCovid19', 'nomeMedicacaoAntiviral');
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn('NotificacaoCovid19', 'medicacaoAntitermica', {
        type: Sequelize.BOOLEAN,
      });
      await queryInterface.addColumn('NotificacaoCovid19', 'nomeMedicacaoAntitermica', {
        type: Sequelize.STRING(120),
      });
      await queryInterface.addColumn('NotificacaoCovid19', 'medicacaoAnalgesica', {
        type: Sequelize.BOOLEAN,
      });
      await queryInterface.addColumn('NotificacaoCovid19', 'nomeMedicacaoAnalgesica', {
        type: Sequelize.STRING(120),
      });
      await queryInterface.addColumn('NotificacaoCovid19', 'medicacaoAntiviral', {
        type: Sequelize.BOOLEAN,
      });
      await queryInterface.addColumn('NotificacaoCovid19', 'nomeMedicacaoAntiviral', {
        type: Sequelize.STRING(120),
      });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
