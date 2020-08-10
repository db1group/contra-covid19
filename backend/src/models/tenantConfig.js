/* eslint-disable no-param-reassign */
const { normalizarTexto } = require('../lib/normalizar-texto');

const normalizarTextoFechamento = (fechamento) => {
  fechamento.nome = normalizarTexto(fechamento.nome);
  fechamento.email = fechamento.email.toLowerCase();
  fechamento.cnes = fechamento.cnes.padStart(7, '0');
};

module.exports = (sequelize, DataTypes) => {
  const TenantConfig = sequelize.define('TenantConfig', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    cnes: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    municipioId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    tokenSecretaria: {
      type: DataTypes.STRING(1000),
    },
    periodo: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    dtBloqueioFechamento: DataTypes.DATEONLY,
    ultimoPeriodo: {
      type: DataTypes.STRING(5),
    },
  }, {});
  TenantConfig.associate = (models) => {
    TenantConfig.hasMany(models.TenantMunicipio, { foreignKey: 'configId' });
    TenantConfig.belongsTo(models.Municipio, { foreignKey: 'municipioId' });
  };
  TenantConfig.beforeSave((fechamento, _options) => {
    normalizarTextoFechamento(fechamento);
  });
  return TenantConfig;
};
