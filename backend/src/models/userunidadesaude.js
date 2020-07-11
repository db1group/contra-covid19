module.exports = (sequelize, DataTypes) => {
  const UserUnidadeSaude = sequelize.define('UserUnidadeSaude', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    unidadeSaudeId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  }, {});
  UserUnidadeSaude.associate = (models) => {
    UserUnidadeSaude.belongsTo(models.UnidadeSaude, {
      foreignKey: 'unidadeSaudeId',
    });
    UserUnidadeSaude.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };
  return UserUnidadeSaude;
};
