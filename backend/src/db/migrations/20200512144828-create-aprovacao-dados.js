module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('AprovacaoDado', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    data: {
      type: Sequelize.DATEONLY,
    },
    aprovado: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
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
  down: (queryInterface) => queryInterface.dropTable('AprovacaoDado'),
};
