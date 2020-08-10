
module.exports = {
  async up(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface
        .removeConstraint('FechamentoNotificacaoCovid19', 'FechamentoNotificacaoCovid19_dataFechamento_key');
      await queryInterface.addConstraint('FechamentoNotificacaoCovid19', {
        fields: ['dataFechamento', 'municipioId'],
        type: 'unique',
        name: 'FechamentoNotificacaoCovid19_dataMunicipio_key',
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
      await queryInterface
        .removeConstraint('FechamentoNotificacaoCovid19', 'FechamentoNotificacaoCovid19_dataMunicipio_key');
      await queryInterface.addConstraint('FechamentoNotificacaoCovid19', {
        fields: ['dataFechamento'],
        type: 'unique',
        name: 'FechamentoNotificacaoCovid19_dataFechamento_key',
      });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
