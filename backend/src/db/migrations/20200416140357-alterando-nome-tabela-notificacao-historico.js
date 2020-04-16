
module.exports = {
  up: (queryInterface) => queryInterface.renameTable('NotificacaoHistorico', 'NotificacaoCovid19'),

  down: (queryInterface) => queryInterface.renameTable('NotificacaoCovid19', 'NotificacaoHistorico'),
};
