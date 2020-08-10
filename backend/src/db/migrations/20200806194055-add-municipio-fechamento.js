module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('FechamentoNotificacaoCovid19', 'municipioId', {
    type: Sequelize.UUID,
    references: {
      model: 'Municipio',
      key: 'id',
    },
  }),
  down: (queryInterface) => queryInterface.removeColumn('FechamentoNotificacaoCovid19', 'municipioId'),
};
