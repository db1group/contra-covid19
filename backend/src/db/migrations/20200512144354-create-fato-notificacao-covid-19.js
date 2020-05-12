module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('FatoNotificacaoCovid19', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    dtFato: {
      type: Sequelize.DATEONLY,
    },
    dmPacienteId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'DmPaciente',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    dmLocalizacaoId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'DmLocalizacao',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    qtSuspeito: {
      type: Sequelize.INTEGER,
    },
    qtSuspeitoRegular: {
      type: Sequelize.INTEGER,
    },
    qtSuspeitoUTI: {
      type: Sequelize.INTEGER,
    },
    qtEncerrado: {
      type: Sequelize.INTEGER,
    },
    qtSuspeitoAcompanhamento: {
      type: Sequelize.INTEGER,
    },
    qtConfirmado: {
      type: Sequelize.INTEGER,
    },
    qtConfirmadoRegular: {
      type: Sequelize.INTEGER,
    },
    qtConfirmadoUTI: {
      type: Sequelize.INTEGER,
    },
    qtConfirmadoIsolamento: {
      type: Sequelize.INTEGER,
    },
    qtRecuperado: {
      type: Sequelize.INTEGER,
    },
    qtObito: {
      type: Sequelize.INTEGER,
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
  down: (queryInterface) => queryInterface.dropTable('FatoNotificacaoCovid19'),
};
