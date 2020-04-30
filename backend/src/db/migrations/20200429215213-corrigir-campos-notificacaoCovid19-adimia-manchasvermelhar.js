module.exports = {
  up: async (queryInterface) => {
    await queryInterface.renameColumn('NotificacaoCovid19', 'adiamiaFraqueza', 'adinamiaFraqueza');
    await queryInterface.renameColumn('NotificacaoCovid19', 'manchasVermelhar', 'manchasVermelhas');
  },
  down: async (queryInterface) => {
    await queryInterface.renameColumn('NotificacaoCovid19', 'adinamiaFraqueza', 'adiamiaFraqueza');
    await queryInterface.renameColumn('NotificacaoCovid19', 'manchasVermelhas', 'manchasVermelhar');
  },
};
