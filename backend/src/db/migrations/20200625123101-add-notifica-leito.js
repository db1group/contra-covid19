module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('NotificaLeito', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      autoIncrement: false,
    },
    unidadeSaudeId: {
      type: Sequelize.UUID,
      references: {
        model: 'UnidadeSaude',
        key: 'id',
      },
      allowNull: false,
    },
    dtNotificacao: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    controleLeitoId: {
      type: Sequelize.UUID,
      references: {
        model: 'ControleLeito',
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
  down: (queryInterface) => queryInterface.dropTable('NotificaLeito'),
};
