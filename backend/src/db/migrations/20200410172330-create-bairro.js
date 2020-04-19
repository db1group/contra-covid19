module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Bairro', {
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
    municipioId: {
      type: Sequelize.UUID,
      references: {
        model: 'Municipio',
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
  down: (queryInterface) => queryInterface.dropTable('Bairro'),
};
