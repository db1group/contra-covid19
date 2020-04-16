"use strict";
module.exports = (sequelize, DataTypes) => {
  const Profissao = sequelize.define(
    "Profissao",
    {
      nome: DataTypes.STRING(60),
    },
    {}
  );
  Profissao.associate = function (models) {};
  return Profissao;
};
