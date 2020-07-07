module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize
    .query('update "NotificacaoCovid19" set "tpTransmissaoApiSecretaria" = \'ENVIADA\' where "tpTransmissaoApiSecretaria" is null',
      {
        raw: true,
        type: Sequelize.QueryTypes.UPDATE,
      }),
  down: (queryInterface) => queryInterface.bulkUpdate('NotificacaoCovid19', { tpTransmissaoApiSecretaria: null }, {}),
};
