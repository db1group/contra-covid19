module.exports = (sequelize, DataTypes) => {
  const Exame = sequelize.define('Exame', {
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
  Exame.associate = (models) => {
    Exame.hasMany(models.NotificacaoCovid19, { foreignKey: 'exameId' });
  };
  return Exame;
};
