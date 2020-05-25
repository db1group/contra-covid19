module.exports = (sequelize, DataTypes) => {
  const EnvioSecretariaLote = sequelize.define('EnvioSecretariaLote', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    status: DataTypes.ENUM('PENDENTE', 'PROCESSANDO', 'ERRO', 'OK'),
  });

  EnvioSecretariaLote.associate = (models) => {
    EnvioSecretariaLote.hasMany(models.EnvioSecretariaLoteItem, { foreignKey: 'envioSecretariaLoteId' });
  };

  return EnvioSecretariaLote;
};
