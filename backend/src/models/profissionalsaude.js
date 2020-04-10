'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProfissionalSaude = sequelize.define('ProfissionalSaude', {
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    profissao: DataTypes.STRING,
    unidadesaudeId: DataTypes.UUID
  }, {});
  ProfissionalSaude.associate = function(models) {
    // associations can be defined here
  };
  return ProfissionalSaude;
};