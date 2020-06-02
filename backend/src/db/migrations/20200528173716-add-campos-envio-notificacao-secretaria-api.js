module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn('NotificacaoCovid19', 'tpTransmissaoApiSecretaria', {
        type: Sequelize.STRING(120),
      });
      await queryInterface.addColumn('NotificacaoCovid19', 'apiSecretariaId', {
        type: Sequelize.INTEGER,
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
      await queryInterface.removeColumn('NotificacaoCovid19', 'tpTransmissaoApiSecretaria');
      await queryInterface.removeColumn('NotificacaoCovid19', 'apiSecretariaId');
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
