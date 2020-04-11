'use strict';
module.exports = (sequelize, DataTypes) => {
  const Municipio = sequelize.define('Municipio', {
    nome: DataTypes.STRING,
    uf: DataTypes.STRING
  });
  Municipio.associate = function (models) {
    //Municipio.hasMany(models.Bairro);
  };
  return Municipio;
};