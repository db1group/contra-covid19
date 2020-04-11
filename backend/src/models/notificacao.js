"use strict";
module.exports = (sequelize, DataTypes) => {
  const Notificacao = sequelize.define(
    "Notificacao",
    {
      userId: DataTypes.UUID,
      unidadeId: DataTypes.UUID,
      notificadorId: DataTypes.UUID,
      bairroId: DataTypes.UUID,
      pessoaId: DataTypes.UUID,
    },
    {}
  );
  Notificacao.associate = function (models) {
    Notificacao.belongsTo(models.UnidadeSaude, {
      foreignKey: "unidadeId",
    });
    Notificacao.belongsTo(models.User, {
      foreignKey: "userId",
    });
    Notificacao.belongsTo(models.ProfissionalSaude, {
       foreignKey: "notificadorId",
     });
    Notificacao.belongsTo(models.Bairro);
    Notificacao.belongsTo(models.Pessoa, {
       foreignKey: "pessoaId",
     });
    Notificacao.hasMany(models.NotificacaoHistorico);
  };
  return Notificacao;
};
