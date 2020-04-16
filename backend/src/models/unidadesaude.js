module.exports = (sequelize, DataTypes) => {
  const UnidadeSaude = sequelize.define('UnidadeSaude', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: DataTypes.STRING,
    municipioId: DataTypes.UUID,
  });
  UnidadeSaude.associate = (_) => {
    // associations can be defined here
  };
  return UnidadeSaude;
};
