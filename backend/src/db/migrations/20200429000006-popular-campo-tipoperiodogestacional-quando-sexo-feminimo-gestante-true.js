module.exports = {
  async up(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkUpdate('Pessoa', {
        tipoPeriodoGestacional: 'IDADE_GESTACIONAL_IGNORADA',
      }, {
        sexo: 'M',
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
        sexo: 'M',
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
