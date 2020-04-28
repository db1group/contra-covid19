module.exports = {
  up: (queryInterface, _) => queryInterface.renameColumn('NotificacaoCovid19', 'raioxXConsolidacao', 'raioXConsolidacao'),
  down: (queryInterface, _) => queryInterface.renameColumn('NotificacaoCovid19', 'raioXConsolidacao', 'raioxXConsolidacao'),
};
