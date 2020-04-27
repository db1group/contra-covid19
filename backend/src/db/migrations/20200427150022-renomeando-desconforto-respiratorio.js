module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkUpdate('NotificacaoCovid19', {
        dispneia: Sequelize.col('NotificacaoCovid19.desconfortoRespiratorio'),
      }, {
        desconfortoRespiratorio: true,
      }, {
        transaction,
      });

      await queryInterface.renameColumn('NotificacaoCovid19',
        'desconfortoRespiratorio', 'batimentoAsasNasais', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  down: (queryInterface) => queryInterface.renameColumn('NotificacaoCovid19', 'batimentoAsasNasais', 'desconfortoRespiratorio'),
};
