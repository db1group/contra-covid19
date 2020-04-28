module.exports = {
  async up(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkUpdate('NotificacaoCovid19', {
        vomito: true,
      }, {
        nausea: true,
      }, {
        transaction,
      });

      await queryInterface.renameColumn('NotificacaoCovid19', 'vomito', 'nauseaVomito', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  down: (queryInterface) => queryInterface.renameColumn('NotificacaoCovid19', 'nauseaVomito', 'vomito'),
};
