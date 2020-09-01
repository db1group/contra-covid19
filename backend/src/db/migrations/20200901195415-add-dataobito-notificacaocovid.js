module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('NotificacaoCovid19', 'dataObito', {
    type: Sequelize.DATEONLY,
  }),
  down: (queryInterface) => queryInterface.removeColumn('NotificacaoCovid19', 'dataObito'),
};
