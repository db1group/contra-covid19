module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn('NotificacaoCovid19', 'tamiflu', {
        type: Sequelize.BOOLEAN,
      });
      await queryInterface.addColumn('NotificacaoCovid19', 'hidroxicloroquina', {
        type: Sequelize.BOOLEAN,
      });
      await queryInterface.addColumn('NotificacaoCovid19', 'nomeMedicamento', {
        type: Sequelize.STRING(120),
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
      await queryInterface.removeColumn('NotificacaoCovid19', 'tamiflu');
      await queryInterface.removeColumn('NotificacaoCovid19', 'hidroxicloroquina');
      await queryInterface.removeColumn('NotificacaoCovid19', 'nomeMedicamento');
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
