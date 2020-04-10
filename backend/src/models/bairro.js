'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bairro = sequelize.define('Bairro', {
    nome: DataTypes.STRING,
    municipioId: DataTypes.UUID
  });
  Bairro.associate = function(models) {
    // associations can be defined here
    Bairro.associate = models => {
      Bairro.belongsTo(models.Municipio);
    };
  
  };
  return Bairro;
};