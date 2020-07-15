module.exports = (sequelize, DataTypes) => {
  const Pais = sequelize.define('Pais', {
    nome: DataTypes.STRING,
    codigo: DataTypes.STRING,
  }, { freezeTableName: true });
  Pais.associate = (models) => {
    Pais.hasMany(models.Pessoa, { foreignKey: 'paisId' });
  };
  return Pais;
};
