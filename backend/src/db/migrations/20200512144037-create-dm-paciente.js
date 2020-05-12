module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('DmPaciente', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    sexo: {
      type: Sequelize.STRING(1),
    },
    comorbidade: {
      type: Sequelize.BOOLEAN,
    },
    faixaEtaria: {
      type: Sequelize.STRING(10),
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('DmPaciente'),
};
