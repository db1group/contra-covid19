module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.changeColumn('Pessoa', 'dataDeNascimento', {
      type: Sequelize.DATEONLY,
      allowNull: false,
    }),
  ]),
  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.changeColumn('Pessoa', 'dataDeNascimento', {
      type: Sequelize.DATE,
      allowNull: true,
    }),
  ]),
};
