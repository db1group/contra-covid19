'use strict';
module.exports = (sequelize, DataTypes) => {
  const unidadesaude = sequelize.define('UnidadeSaude', {
    nome: DataTypes.STRING,
    municipioId: DataTypes.UUID
  }, {});
  unidadesaude.associate = function(models) {
    // associations can be defined here
  };
  return UnidadeSaude;
};