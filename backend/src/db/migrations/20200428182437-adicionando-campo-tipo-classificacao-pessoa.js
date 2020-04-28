module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn('Pessoa', 'tipoClassificacaoPessoa', {
        type: Sequelize.STRING(19),
        allowNull: false,
        defaultValue: 'OUTRO',
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
      await queryInterface.removeColumn('Pessoa', 'tipoClassificacaoPessoa');
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
