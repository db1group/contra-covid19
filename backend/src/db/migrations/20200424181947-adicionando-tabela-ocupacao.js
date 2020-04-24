module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Ocupacao', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      autoIncrement: false,
    },
    descricao: {
      type: Sequelize.STRING(80),
      allowNull: false,
    },
    classificacao: {
      type: Sequelize.STRING(60),
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('Ocupacao'),
};
