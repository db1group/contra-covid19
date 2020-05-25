module.exports = (sequelize, DataTypes) => {
  const EnvioSecretariaLoteItem = sequelize.define('EnvioSecretariaLoteItem', {
    notificacaoId: DataTypes.UUID,
    envioSecretariaLoteId: DataTypes.UUID,
    dataEnvio: DataTypes.DATE,
    status: DataTypes.ENUM('PENDENTE', 'PROCESSANDO', 'ERRO', 'ENVIADO', 'ENVIO_CANCELADO_USUARIO'),
  });

  EnvioSecretariaLoteItem.associate = (models) => {
    EnvioSecretariaLoteItem.belongsTo(models.EnvioSecretariaLote, { foreignKey: 'envioSecretariaLoteId' });
  };

  return EnvioSecretariaLoteItem;
};
