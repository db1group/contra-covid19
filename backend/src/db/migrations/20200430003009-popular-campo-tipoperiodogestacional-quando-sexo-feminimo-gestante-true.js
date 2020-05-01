module.exports = {
  async up(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkUpdate('Pessoa', {
        tipoPeriodoGestacional: 'IDADE_GESTACIONAL_IGNORADA',
      }, {
        sexo: 'F',
        gestante: 'SIM',
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
      await queryInterface.bulkUpdate('Pessoa', {
        tipoPeriodoGestacional: null,
      }, {
        sexo: 'F',
        gestante: 'SIM',
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
