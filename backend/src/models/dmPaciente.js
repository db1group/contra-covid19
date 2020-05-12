module.exports = (sequelize, DataTypes) => {
  const DmPaciente = sequelize.define('DmPaciente', {
    sexo: DataTypes.STRING(1),
    comorbidade: DataTypes.BOOLEAN,
    faixaEtaria: DataTypes.STRING(10),
  }, {});
  DmPaciente.associate = (models) => {
    DmPaciente.hasMany(models.FatoNotificacaoCovid19, { foreignKey: 'dmPacienteId' });
  };
  return DmPaciente;
};
