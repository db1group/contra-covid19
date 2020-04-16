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
    },
    unidadeSaudeId: {
      type: Sequelize.UUID,
      references: {
        model: 'UnidadeSaude',
        key: 'id',
      },
    },
    notificadorId: {
      type: Sequelize.UUID,
      references: {
        model: 'ProfissionalSaude',
        key: 'id',
      },
    },
    bairroId: {
      type: Sequelize.UUID,
      references: {
        model: 'Bairro',
        key: 'id',
      },
    },
    pessoaId: {
      type: Sequelize.UUID,
      references: {
        model: 'Pessoa',
        key: 'id',
      },
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
