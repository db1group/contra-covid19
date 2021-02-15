module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Taxa', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    dtfechamento: {
      type: Sequelize.DATEONLY,
    },
    positividade: {
      type: Sequelize.DOUBLE,
    },
    ocupacao: {
      type: Sequelize.DOUBLE,
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
  down: (queryInterface) => queryInterface.dropTable('Taxas'),
};
