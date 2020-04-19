
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn('Pessoa', 'gestante', { type: Sequelize.STRING(12) }, { transaction });
      await queryInterface.addColumn('Pessoa', 'racaCor', { type: Sequelize.STRING(10) }, { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('Pessoa', 'gestante', { transaction });
      await queryInterface.removeColumn('Pessoa', 'racaCor', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
