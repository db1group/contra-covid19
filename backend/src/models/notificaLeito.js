module.exports = (sequelize, DataTypes) => {
  const NotificaLeito = sequelize.define('NotificaLeito', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    unidadeSaudeId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    dtNotificacao: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    controleLeitoId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  }, {});
  NotificaLeito.associate = (models) => {
    NotificaLeito.belongsTo(models.UnidadeSaude, {
      foreignKey: 'unidadeSaudeId',
    });
    NotificaLeito.belongsTo(models.ControleLeito, {
      foreignKey: 'controleLeitoId',
    });
  };
  return NotificaLeito;
};
