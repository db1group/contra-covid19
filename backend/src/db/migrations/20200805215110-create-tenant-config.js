module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('TenantConfig', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      autoIncrement: false,
    },
    nome: {
      type: Sequelize.STRING(150),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(150),
      allowNull: false,
    },
    cnes: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    municipioId: {
      type: Sequelize.UUID,
      allowNull: false,
      unique: true,
      references: {
        model: 'Municipio',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    tokenSecretaria: {
      type: Sequelize.STRING(1000),
    },
    periodo: {
      type: Sequelize.STRING(5),
      allowNull: false,
    },
    dtBloqueioFechamento: {
      type: Sequelize.DATEONLY,
    },
    ultimoPeriodo: {
      type: Sequelize.STRING(5),
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
  down: (queryInterface) => queryInterface.dropTable('TenantConfig'),
};
