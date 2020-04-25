
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn('NotificacaoCovid19', 'tipoLaboratorio', {
        type: Sequelize.STRING(12),
        allowNull: false,
        defaultValue: '',
      });
      await queryInterface.addColumn('NotificacaoCovid19', 'nomeLaboratorioEnvioMaterial', { type: Sequelize.STRING(30) });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      queryInterface.removeColumn('NotificacaoCovid19', 'tipoLaboratorio', { transaction });
      queryInterface.removeColumn('NotificacaoCovid19', 'nomeLaboratorioEnvioMaterial', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
