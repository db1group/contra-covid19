module.exports = (sequelize, DataTypes) => {
  const ControleLeito = sequelize.define('ControleLeito', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
  }, {});
  ControleLeito.associate = (_models) => {
    // ControleLeito.hasMany(models.NotificaLeitoControleLeito, { foreignKey: 'ControleLeitoId' });
  };
  return ControleLeito;
};
