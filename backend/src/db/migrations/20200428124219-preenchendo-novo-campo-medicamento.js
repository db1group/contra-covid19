module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkUpdate('NotificacaoCovid19', {
        nomeMedicamento: Sequelize.literal("NotificacaoCovid19.nomeMedicacaoAnalgesica || ', ' || NotificacaoCovid19.nomeMedicacaoAntiflamatorio || ', ' || NotificacaoCovid19.nomeMedicacaoAntitermica || ', ' || NotificacaoCovid19.nomeMedicacaoAntiviral"),
      }, {

      }, {
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
      await queryInterface.bulkUpdate('NotificacaoCovid19', {
        nomeMedicamento: '',
      }, {

      }, {
        transaction,
      });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
