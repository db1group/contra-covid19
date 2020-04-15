"use strict";
module.exports = (sequelize, DataTypes) => {
  const Bairro = sequelize.define("Bairro", {
    nome: DataTypes.STRING,
    municipioId: DataTypes.UUID,
  });
  Bairro.associate = function (models) {
    Bairro.belongsTo(models.Municipio, { foreignKey: "municipioId" });
    Bairro.hasMany(models.Pessoa, { foreignKey: "bairroId" });
  };
  return Bairro;
};
