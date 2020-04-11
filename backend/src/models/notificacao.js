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
    Notificacao.belongsTo(models.UnidadeSaude);
    Notificacao.belongsTo(models.User);
    Notificacao.belongsTo(models.ProfissionalSaude, {
      foreignKey: "notificadorId",
    });
    Notificacao.belongsTo(models.Bairro);
    Notificacao.belongsTo(models.Pessoa);
  };
  return Notificacao;
};
