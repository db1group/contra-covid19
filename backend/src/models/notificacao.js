"use strict";
module.exports = (sequelize, DataTypes) => {
  const Notificacao = sequelize.define(
    "Notificacao",
    {
      userId: DataTypes.UUID,
      unidadeSaudeId: DataTypes.UUID,
      notificadorId: DataTypes.UUID,
      bairroId: DataTypes.UUID,
      pessoaId: DataTypes.UUID,
    },
    {}
  );
  Notificacao.associate = function (models) {
    Notificacao.belongsTo(models.UnidadeSaude, {
      foreignKey: "unidadeSaudeId",
    });
    Notificacao.belongsTo(models.User, {
      foreignKey: "userId",
    });
    Notificacao.belongsTo(models.ProfissionalSaude, {
      foreignKey: "notificadorId",
    });
    Notificacao.belongsTo(models.ProfissionalSaude, {
      foreignKey: "notificadorId",
    });
    Notificacao.belongsTo(models.Bairro, {
      foreignKey: "bairroId",
    });
    Notificacao.belongsTo(models.Pessoa, {
      foreignKey: "pessoaId",
    });
    Notificacao.hasOne(models.NotificacaoHistorico, {
      foreignKey: "notificacaoId",
    });
  };
  return Notificacao;
};
