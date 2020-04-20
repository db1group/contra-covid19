
module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.changeColumn('EvolucaoResumo', 'nomeMunicipio', {
      type: Sequelize.DataTypes.STRING(80),
    }),
    queryInterface.changeColumn('EvolucaoDiaria', 'nomeMunicipio', {
      type: Sequelize.DataTypes.STRING(80),
    }),
  ]),
  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.changeColumn('EvolucaoResumo', 'nomeMunicipio', {
      type: Sequelize.DataTypes.STRING(12),
    }),
    queryInterface.changeColumn('EvolucaoDiaria', 'nomeMunicipio', {
      type: Sequelize.DataTypes.STRING(12),
    }),
  ]),
};
