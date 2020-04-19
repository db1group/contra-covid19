module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Notificacao', {
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
    notificadorId: {
      type: Sequelize.UUID,
      references: {
        model: 'ProfissionalSaude',
        key: 'id',
      },
      allowNull: false,
    },
    bairroId: {
      type: Sequelize.UUID,
      references: {
        model: 'Bairro',
        key: 'id',
      },
      allowNull: false,
    },
    pessoaId: {
      type: Sequelize.UUID,
      references: {
        model: 'Pessoa',
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
  }),
  down: (queryInterface) => queryInterface.dropTable('Notificacao'),
};
