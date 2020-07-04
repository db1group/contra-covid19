module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('Municipio', 'ufIBGE', {
      type: Sequelize.STRING(2),
      allowNull: true,
      defaultValue: '',
      transaction: t,
    }),
    queryInterface.addColumn('Municipio', 'residenciaIBGE', {
      type: Sequelize.STRING(7),
      allowNull: true,
      defaultValue: '',
      transaction: t,
    }),
  ])),
  down: (queryInterface) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Municipio', 'ufIBGE', { transaction: t }),
    queryInterface.removeColumn('Municipio', 'residenciaIBGE', { transaction: t }),
  ])),
};
