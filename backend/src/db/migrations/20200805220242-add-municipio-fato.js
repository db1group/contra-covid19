module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('FatoNotificacaoCovid19', 'municipioId', {
    type: Sequelize.UUID,
    references: {
      model: 'Municipio',
      key: 'id',
    },
  }),
  down: (queryInterface) => queryInterface.removeColumn('FatoNotificacaoCovid19', 'municipioId'),
};
