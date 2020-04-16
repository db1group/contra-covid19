module.exports = (sequelize, DataTypes) => {
  const Notificacao = sequelize.define(
    'Notificacao',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: DataTypes.UUID,
      unidadeSaudeId: DataTypes.UUID,
      notificadorId: DataTypes.UUID,
      bairroId: DataTypes.UUID,
      pessoaId: DataTypes.UUID,
    },
    {},
  );
  Notificacao.associate = (models) => {
    Notificacao.belongsTo(models.UnidadeSaude, {
      foreignKey: 'unidadeSaudeId',
    });
    Notificacao.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    Notificacao.belongsTo(models.ProfissionalSaude, {
      foreignKey: 'notificadorId',
    });
    Notificacao.belongsTo(models.Bairro, {
      foreignKey: 'bairroId',
    });
    Notificacao.belongsTo(models.Pessoa, {
      foreignKey: 'pessoaId',
    });
    Notificacao.hasOne(models.NotificacaoHistorico, {
      foreignKey: 'notificacaoId',
    });
  };
  return Notificacao;
};
