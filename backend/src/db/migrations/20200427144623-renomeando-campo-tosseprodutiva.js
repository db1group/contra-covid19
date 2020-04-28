module.exports = {
  up: (queryInterface) => queryInterface.renameColumn('NotificacaoCovid19', 'tosseProdutiva', 'escarro'),
  down: (queryInterface) => queryInterface.renameColumn('NotificacaoCovid19', 'escarro', 'tosseProdutiva'),
};
