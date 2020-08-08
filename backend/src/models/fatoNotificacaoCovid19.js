module.exports = (sequelize, DataTypes) => {
  const FatoNotificacaoCovid19 = sequelize.define('FatoNotificacaoCovid19', {
    dtfato: DataTypes.DATEONLY,
    dmpacienteid: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    dmlocalizacaoid: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    qtsuspeito: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    qtsuspeitoisolamento: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    qtsuspeitoregular: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    qtsuspeitouti: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    qtencerrado: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    qtconfirmado: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    qtconfirmadoisolamento: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    qtconfirmadoregular: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    qtconfirmadouti: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    qtrecuperado: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    qtobito: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    qtdescartado: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    municipioId: {
      type: DataTypes.UUID,
    },
  }, {
    timestamps: false,
  });
  FatoNotificacaoCovid19.associate = (models) => {
    FatoNotificacaoCovid19.belongsTo(models.DmPaciente, { foreignKey: 'dmPacienteId' });
    FatoNotificacaoCovid19.belongsTo(models.DmLocalizacao, { foreignKey: 'dmLocalizacaoId' });
  };
  return FatoNotificacaoCovid19;
};
