module.exports = (sequelize, DataTypes) => {
  const Municipio = sequelize.define('Municipio', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: DataTypes.STRING,
    uf: DataTypes.STRING,
  });
  Municipio.associate = (models) => {
    Municipio.hasMany(models.Bairro, { foreignKey: 'municipioId' });
    Municipio.hasMany(models.Pessoa, { foreignKey: 'municipioId' });
  };
  return Municipio;
};
