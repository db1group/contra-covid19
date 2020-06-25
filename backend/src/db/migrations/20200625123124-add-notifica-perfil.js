module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('NotificaLeitoPerfil', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      autoIncrement: false,
    },
    notificaLeitoId: {
      type: Sequelize.UUID,
      references: {
        model: 'NotificaLeito',
        key: 'id',
      },
      allowNull: false,
    },
    perfilId: {
      type: Sequelize.UUID,
      references: {
        model: 'Perfil',
        key: 'id',
      },
      allowNull: false,
    },
    causa: {
      type: Sequelize.STRING(150),
      allowNull: false,
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
  down: (queryInterface) => queryInterface.dropTable('NotificaLeitoPerfil'),
};
