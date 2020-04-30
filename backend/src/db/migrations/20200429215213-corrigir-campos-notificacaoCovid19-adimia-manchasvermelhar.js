module.exports = {
  up: (queryInterface) => {
    queryInterface.renameColumn('NotificacaoCovid19', 'adiamiaFraqueza', 'adinamiaFraqueza');
    queryInterface.renameColumn('NotificacaoCovid19', 'manchasVermelhar', 'manchasVermelhas');
  },
  down: (queryInterface) => {
    queryInterface.renameColumn('NotificacaoCovid19', 'adinamiaFraqueza', 'adiamiaFraqueza');
    queryInterface.renameColumn('NotificacaoCovid19', 'manchasVermelhas', 'manchasVermelhar');
  },
};
