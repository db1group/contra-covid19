
module.exports = (sequelize, DataTypes) => {
  const NotificacaoEvolucao = sequelize.define('NotificacaoEvolucao', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    notificacaoId: DataTypes.UUID,
    observacao: DataTypes.STRING,
    dtEvolucao: DataTypes.DATE,
    tpEvolucao: DataTypes.ENUM('SUSPEITO', 'CONFIRMADO', 'DESCARTADO', 'CURA', 'ENCERRADO', 'OBITO'),
    tpLocal: DataTypes.ENUM('Alta com isolamento domiciliar', 'Hospitalizado – Leito comum', 'Hospitalizado - Leito UTI'),
  }, {});
  NotificacaoEvolucao.associate = function (models) {
    NotificacaoEvolucao.belongsTo(models.Notificacao, { foreignKey: 'notificacaoId' });
  };
  return NotificacaoEvolucao;
};
