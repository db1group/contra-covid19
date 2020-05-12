module.exports = (sequelize, DataTypes) => {
  const DmLocalizacao = sequelize.define('DmLocalizacao', {
    bairo: DataTypes.STRING(100),
    cidade: DataTypes.STRING(50),
    estado: DataTypes.STRING(2),
    pais: DataTypes.STRING(50),
  }, {});
  DmLocalizacao.associate = (models) => {
    DmLocalizacao.hasMany(models.FatoNotificacaoCovid19, { foreignKey: 'dmLocalizacaoId' });
  };
  return DmLocalizacao;
};
