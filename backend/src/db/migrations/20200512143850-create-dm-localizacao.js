module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('DmLocalizacao', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    bairo: {
      type: Sequelize.STRING(100),
    },
    cidade: {
      type: Sequelize.STRING(50),
    },
    estado: {
      type: Sequelize.STRING(2),
    },
    pais: {
      type: Sequelize.STRING(50),
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
  down: (queryInterface) => queryInterface.dropTable('DmLocalizacao'),
};
