module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ControleLeito', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      autoIncrement: false,
    },
    qtEnfermariaCovid: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    qtUTIAdultaCovid: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    qtUTIPedCovid: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    qtUTINeoCovid: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    qtEnfermariaNormal: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    qtUTIPedNormal: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    qtUTINeoNormal: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    qtEnfermariaPrivado: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    qtUTIAdultaPrivado: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    qtUTIPedPrivado: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    qtUTINeoPrivado: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    qtUTIAdultaNormal: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
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
  down: (queryInterface) => queryInterface.dropTable('ControleLeito'),
};
