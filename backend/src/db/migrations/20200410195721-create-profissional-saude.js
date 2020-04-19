module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ProfissionalSaude', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      autoIncrement: false,
    },
    nome: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    profissao: {
      type: Sequelize.STRING,
    },
    unidadesaudeId: {
      type: Sequelize.UUID,
      references: {
        model: 'UnidadeSaude',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
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
  down: (queryInterface) => queryInterface.dropTable('ProfissionalSaude'),
};
