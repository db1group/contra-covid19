"use strict";
module.exports = (sequelize, DataTypes) => {
  const Profissao = sequelize.define(
    "Profissao",
    {
      nome: DataTypes.STRING(60),
      allowNull: false,
    },
    {}
  );
  Profissao.associate = function (models) {};
  return Profissao;
};
