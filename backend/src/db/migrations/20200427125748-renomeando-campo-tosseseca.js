module.exports = {
  up: (queryInterface) => queryInterface.renameColumn('NotificacaoCovid19', 'tosseSeca', 'tosse'),
  down: (queryInterface) => queryInterface.renameColumn('NotificacaoCovid19', 'tosseSeca', 'tosse'),
};
