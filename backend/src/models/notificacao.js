module.exports = (sequelize, DataTypes) => {
  const Notificacao = sequelize.define(
    'Notificacao',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
      },
      unidadeSaudeId: {
        type: DataTypes.UUID,
      },
      notificadorId: {
        type: DataTypes.UUID,
      },
      bairroId: {
        type: DataTypes.UUID,
      },
      pessoaId: {
        type: DataTypes.UUID,
      },
      profissaoId: {
        type: DataTypes.UUID,
      },
      nomeNotificador: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM('ABERTO', 'ENCERRADA', 'EXCLUIDA'),
      },
      municipioId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
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
    Notificacao.hasOne(models.NotificacaoCovid19, {
      foreignKey: 'notificacaoId',
    });
    Notificacao.belongsTo(models.Profissao, {
      foreignKey: 'profissaoId',
    });
    Notificacao.hasMany(models.NotificacaoEvolucao, {
      foreignKey: 'notificacaoId',
    });
  };
  return Notificacao;
};
