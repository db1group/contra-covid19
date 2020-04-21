/* eslint-disable no-param-reassign */
const { normalizarTexto } = require('../lib/normalizar-texto');

const normalizarTextoBairro = (bairro) => {
  bairro.nome = normalizarTexto(bairro.nome);
};

module.exports = (sequelize, DataTypes) => {
  const Bairro = sequelize.define('Bairro', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: DataTypes.STRING,
    municipioId: DataTypes.UUID,
  });
  Bairro.associate = (models) => {
    Bairro.belongsTo(models.Municipio, { foreignKey: 'municipioId' });
    Bairro.hasMany(models.Pessoa, { foreignKey: 'bairroId' });
  };
  Bairro.beforeCreate(async (bairro) => {
    normalizarTextoBairro(bairro);
  });
  Bairro.beforeUpdate(async (bairro) => {
    normalizarTextoBairro(bairro);
  });
  return Bairro;
};
