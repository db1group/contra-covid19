
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn('NotificacaoCovid19', 'tipoLaboratorio', {
        type: Sequelize.STRING(12),
        allowNull: false,
        defaultValue: '',
      },
      { transaction });

      await queryInterface.addColumn('NotificacaoCovid19', 'nomeLaboratorioEnvioMaterial', { type: Sequelize.STRING(30) }, { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('NotificacaoCovid19', 'tipoLaboratorio');
    await queryInterface.removeColumn('NotificacaoCovid19', 'nomeLaboratorioEnvioMaterial');
  },
};
