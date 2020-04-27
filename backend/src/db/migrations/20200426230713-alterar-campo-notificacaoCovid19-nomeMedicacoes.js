module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.changeColumn('NotificacaoCovid19', 'nomeMedicacaoAntitermica',
        { type: Sequelize.DataTypes.STRING(120) }, { transaction });
      await queryInterface.changeColumn('NotificacaoCovid19', 'nomeMedicacaoAnalgesica',
        { type: Sequelize.DataTypes.STRING(120) }, { transaction });
      await queryInterface.changeColumn('NotificacaoCovid19', 'nomeMedicacaoAntiflamatorio',
        { type: Sequelize.DataTypes.STRING(120) }, { transaction });
      await queryInterface.changeColumn('NotificacaoCovid19', 'nomeMedicacaoAntiviral',
        { type: Sequelize.DataTypes.STRING(120) }, { transaction });
      await queryInterface.changeColumn('NotificacaoCovid19', 'dataDaViagem',
        { type: Sequelize.DataTypes.DATEONLY }, { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.changeColumn('NotificacaoCovid19', 'nomeMedicacaoAntitermica',
        { type: Sequelize.DataTypes.STRING }, { transaction });
      await queryInterface.changeColumn('NotificacaoCovid19', 'nomeMedicacaoAnalgesica',
        { type: Sequelize.DataTypes.STRING }, { transaction });
      await queryInterface.changeColumn('NotificacaoCovid19', 'nomeMedicacaoAntiflamatorio',
        { type: Sequelize.DataTypes.STRING }, { transaction });
      await queryInterface.changeColumn('NotificacaoCovid19', 'nomeMedicacaoAntiviral',
        { type: Sequelize.DataTypes.STRING }, { transaction });
      await queryInterface.changeColumn('NotificacaoCovid19', 'dataDaViagem',
        { type: Sequelize.DataTypes.DATEONLY }, { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
