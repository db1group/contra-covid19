module.exports = (sequelize, DataTypes) => {
  const ResultadoExame = sequelize.define('ResultadoExame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(150),
      validate: {
        notEmpty: true,
        len: [3, 150],
      },
    },
    codigo: DataTypes.STRING(18),
  }, {});
  ResultadoExame.associate = (models) => {
    ResultadoExame.hasMany(models.NotificacaoCovid19, { foreignKey: 'resultadoExameId' });
  };
  return ResultadoExame;
};
