module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('NotificacaoEvolucao', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      autoIncrement: false,
    },
    notificacaoId: {
      type: Sequelize.UUID,
      references: {
        model: 'Notificacao',
        key: 'id',
      },
    },
    observacao: {
      type: Sequelize.STRING(1000),
    },
    dtEvolucao: {
      type: Sequelize.DATE,
    },
    tpEvolucao: {
      type: Sequelize.STRING(15),
    },
    tpLocal: {
      type: Sequelize.STRING(30),
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
  down: (queryInterface) => queryInterface.dropTable('NotificacaoEvolucao'),
};
