
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('UserUnidadeSaude',
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        autoIncrement: false,
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'User',
          key: 'id',
        },
        allowNull: false,
      },
      unidadeSaudeId: {
        type: Sequelize.UUID,
        references: {
          model: 'UnidadeSaude',
          key: 'id',
        },
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
    },
    {
      uniqueKeys: {
        user_unidade_saude_unique: {
          fields: ['userId', 'unidadeSaudeId'],
        },
      },
    }),
  down: (queryInterface) => queryInterface.dropTable('UserUnidadeSaude'),
};
