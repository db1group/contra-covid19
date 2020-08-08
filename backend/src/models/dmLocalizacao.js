module.exports = (sequelize, DataTypes) => {
  const DmLocalizacao = sequelize.define('DmLocalizacao', {
    bairro: DataTypes.STRING(100),
    cidade: DataTypes.STRING(50),
    estado: DataTypes.STRING(2),
    pais: DataTypes.STRING(50),
  }, {
    timestamps: false,
  });
  DmLocalizacao.associate = (models) => {
    DmLocalizacao.hasMany(models.FatoNotificacaoCovid19, { foreignKey: 'dmLocalizacaoId' });
  };
  return DmLocalizacao;
};
