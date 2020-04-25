
module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.changeColumn('NotificacaoCovid19', 'tipoLaboratorio', {
      type: Sequelize.STRING(12),
      allowNull: true,
      defaultValue: '',
    }),
  ]),
  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.changeColumn('NotificacaoCovid19', 'tipoLaboratorio', {
      type: Sequelize.STRING(12),
      allowNull: false,
      defaultValue: '',
    }),
  ]),
};
