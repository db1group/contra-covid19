module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.query(
    'update "NotificacaoCovid19" set '
    + '"nomeMedicamento" = coalesce("nomeMedicacaoAnalgesica"|| \', \', \'\')  || '
    + '                    coalesce("nomeMedicacaoAntiflamatorio"|| \', \', \'\')  || '
    + '                    coalesce("nomeMedicacaoAntitermica"|| \', \', \'\')  || '
    + '                    coalesce("nomeMedicacaoAntiviral"|| \', \', \'\') ',
    {
      // eslint-disable-next-line no-console
      logging: console.log,
      raw: true,
      type: Sequelize.QueryTypes.UPDATE,
    },
  ),
  down: () => Promise.all([]),
};
