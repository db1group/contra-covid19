module.exports = (sequelize, DataTypes) => {
  const UnidadeSaude = sequelize.define('UnidadeSaude', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: DataTypes.STRING(60),
    municipioId: DataTypes.UUID,
    cnes: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  });
  UnidadeSaude.associate = (_) => {
    // associations can be defined here
  };
  return UnidadeSaude;
};
