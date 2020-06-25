module.exports = (sequelize, DataTypes) => {
  const Perfil = sequelize.define('Perfil', {
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
  Perfil.associate = (_models) => {
    // Perfil.hasMany(models.NotificaLeitoPerfil, { foreignKey: 'perfilId' });
  };
  return Perfil;
};
