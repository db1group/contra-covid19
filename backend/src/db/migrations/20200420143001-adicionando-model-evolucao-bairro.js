
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('EvolucaoBairro', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      autoIncrement: false,
    },
    dataEvolucao: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    nomeMunicipio: {
      type: Sequelize.STRING(80),
      allowNull: false,
    },
    nomeBairro: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    qtdSuspeito: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    qtdConfirmado: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    qtdDescartado: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    qtdCura: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    qtdObito: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    qtdEncerrado: {
      type: Sequelize.INTEGER,
      allowNull: false,
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
  down: (queryInterface) => queryInterface.dropTable('EvolucaoBairro'),
};
