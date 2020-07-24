module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ResultadoExame', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      autoIncrement: false,
    },
    nome: {
      type: Sequelize.STRING(150),
    },
    codigo: {
      type: Sequelize.STRING(18),
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
  down: (queryInterface) => queryInterface.dropTable('ResultadoExame'),
};
