module.exports = (sequelize, DataTypes) => {
  const FatoNotificacaoCovid19 = sequelize.define('FatoNotificacaoCovid19', {
    dtFato: DataTypes.DATEONLY,
    dmPacienteId: DataTypes.INTEGER,
    dmLocalizacaoId: DataTypes.INTEGER,
    qtSuspeito: DataTypes.INTEGER,
    qtSuspeitoRegular: DataTypes.INTEGER,
    qtSuspeitoUTI: DataTypes.INTEGER,
    qtEncerrado: DataTypes.INTEGER,
    qtSuspeitoAcompanhamento: DataTypes.INTEGER,
    qtConfirmado: DataTypes.INTEGER,
    qtConfirmadoRegular: DataTypes.INTEGER,
    qtConfirmadoUTI: DataTypes.INTEGER,
    qtConfirmadoIsolamento: DataTypes.INTEGER,
    qtRecuperado: DataTypes.INTEGER,
    qtObito: DataTypes.INTEGER,
    qtDescartado: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {});
  FatoNotificacaoCovid19.associate = (models) => {
    FatoNotificacaoCovid19.belongsTo(models.DmPaciente, { foreignKey: 'dmPacienteId' });
    FatoNotificacaoCovid19.belongsTo(models.DmLocalizacao, { foreignKey: 'dmLocalizacaoId' });
  };
  return FatoNotificacaoCovid19;
};
