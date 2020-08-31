module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Instituicao', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      autoIncrement: false,
    },
    nome: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    tpInstituicao: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    municipio: {
      type: Sequelize.STRING(150),
      allowNull: false,
    },
    codigo: {
      type: Sequelize.STRING(18),
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
  down: (queryInterface) => queryInterface.dropTable('Instituicao'),
};
