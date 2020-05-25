
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('EnvioSecretariaLote', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      autoIncrement: false,
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
  down: (queryInterface) => queryInterface.dropTable('EnvioSecretariaLote'),
};
