module.exports = (sequelize, DataTypes) => {
  const NotificacaoEvolucao = sequelize.define('NotificacaoEvolucao', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    notificacaoId: DataTypes.UUID,
    observacao: DataTypes.STRING,
    dtEvolucao: {
      type: DataTypes.DATE,
      validate: {
        isDate: true,
        isNotGreaterTomorrow(value) {
          const actualValue = new Date(value);
          let tomorrow = new Date();
          tomorrow = new Date(
            tomorrow.getFullYear(),
            tomorrow.getMonth(),
            tomorrow.getDate(),
          );
          if (actualValue >= tomorrow) {
            throw new Error('A notificação não pode possuir data futura');
          }
        },
      },
    },
    tpEvolucao: DataTypes.ENUM('SUSPEITO', 'CONFIRMADO', 'DESCARTADO', 'CURA', 'ENCERRADO', 'OBITO'),
    tpLocal: DataTypes.ENUM('Alta com isolamento domiciliar', 'Hospitalizado – Leito comum', 'Hospitalizado - Leito UTI'),
  }, {});
  NotificacaoEvolucao.associate = (models) => {
    NotificacaoEvolucao.belongsTo(models.Notificacao, { foreignKey: 'notificacaoId' });
  };
  return NotificacaoEvolucao;
};
