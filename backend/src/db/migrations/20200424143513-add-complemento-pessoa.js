
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Pessoa', 'complemento', {
    type: Sequelize.STRING(150),
  }),
  down: (queryInterface) => queryInterface.removeColumn('Pessoa', 'complemento'),
};
