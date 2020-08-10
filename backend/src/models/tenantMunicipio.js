/* eslint-disable no-param-reassign */
const { normalizarTexto } = require('../lib/normalizar-texto');

const normalizarTextoFechamento = (fechamento) => {
  fechamento.nome = normalizarTexto(fechamento.nome);
};

module.exports = (sequelize, DataTypes) => {
  const TenantMunicipio = sequelize.define('TenantMunicipio', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    configId: {
      type: DataTypes.UUID,
    },
    municipioId: {
      type: DataTypes.UUID,
    },
  }, {});
  TenantMunicipio.associate = (models) => {
    TenantMunicipio.belongsTo(models.TenantConfig, { foreignKey: 'configId' });
    TenantMunicipio.belongsTo(models.Municipio, { foreignKey: 'municipioId' });
  };
  TenantMunicipio.beforeSave((fechamento, _options) => {
    normalizarTextoFechamento(fechamento);
  });
  return TenantMunicipio;
};
