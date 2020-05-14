
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('FechamentoNotificacaoCovid19', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      autoIncrement: false,
    },
    dataFechamento: {
      allowNull: false,
      type: Sequelize.DATE,
      unique: true,
    },
    casosNotificados: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    acompanhados: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    internados: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    casosEncerrados: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    confirmados: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    curados: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    obitos: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    confirmadosInternados: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    emIsolamentoDomiciliar: {
      type: Sequelize.INTEGER,
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
  down: (queryInterface) => queryInterface.dropTable('FechamentoNotificacaoCovid19'),
};
