module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn('Pessoa', 'institucionalizado', {
        type: Sequelize.STRING(25),
        transaction,
      });
      await queryInterface.addColumn('Pessoa', 'tpInstitucionalizado', {
        type: Sequelize.STRING(18),
        transaction,
      });
      await queryInterface.addColumn('Pessoa', 'instituicaoId', {
        type: Sequelize.UUID,
        references: {
          model: 'Instituicao',
          key: 'id',
        },
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
      await queryInterface.removeColumn('Pessoa', 'institucionalizado', { transaction });
      await queryInterface.removeColumn('Pessoa', 'tpInstitucionalizado', { transaction });
      await queryInterface.removeColumn('Pessoa', 'instituicaoId', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
