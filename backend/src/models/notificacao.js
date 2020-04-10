'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notificacao = sequelize.define('Notificacao', {
    userId: DataTypes.UUID,
    unidadeId: DataTypes.UUID,
    notificadorId: DataTypes.UUID,
    bairroId: DataTypes.UUID,
    pessoaId: DataTypes.UUID
  }, {});
  Notificacao.associate = function (models) {
    Notificacao.hasOne(models.Unidade);
    Notificacao.hasOne(models.User);
    Notificacao.hasOne(models.ProfissionalSaude, { foreignKey: 'notificadorId' });
    Notificacao.hasOne(models.Bairro);
    Notificacao.hasOne(models.Pessoa);
  };
  return Notificacao;
};