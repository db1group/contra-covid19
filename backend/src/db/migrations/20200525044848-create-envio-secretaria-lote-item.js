
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('EnvioSecretariaLoteItem', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    envioSecretariaLoteId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'EnvioSecretariaLote',
        key: 'id',
      },
    },
    notificacaoId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Notificacao',
        key: 'id',
      },
    },
    dataEnvio: {
      allowNull: true,
      type: Sequelize.DATE,
    },
    status: {
      type: Sequelize.STRING(30),
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
  down: (queryInterface) => queryInterface.dropTable('EnvioSecretariaLoteItem'),
};
