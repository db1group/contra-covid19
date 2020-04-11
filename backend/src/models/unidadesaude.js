'use strict';
module.exports = (sequelize, DataTypes) => {
  const UnidadeSaude = sequelize.define('UnidadeSaude', {
    nome: DataTypes.STRING,
    municipioId: DataTypes.UUID
  });
  UnidadeSaude.associate = function(models) {
    // associations can be defined here
  };
  return UnidadeSaude;
};