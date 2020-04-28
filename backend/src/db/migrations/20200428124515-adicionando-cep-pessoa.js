
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Pessoa', 'cep', {
    type: Sequelize.STRING(8),
    allowNull: true,
    defaultValue: '',
  }),

  down: (queryInterface) => queryInterface.removeColumn('Pessoa', 'cep'),
};
