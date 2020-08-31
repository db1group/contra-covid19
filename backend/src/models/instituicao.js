/* eslint-disable no-param-reassign */
const { normalizarTexto } = require('../lib/normalizar-texto');

const normalizarTextoInstituicao = (instituicao) => {
  instituicao.nome = normalizarTexto(instituicao.nome);
};

module.exports = (sequelize, DataTypes) => {
  const Instituicao = sequelize.define('Instituicao', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(255),
      validate: {
        notEmpty: true,
        len: [3, 255],
      },
    },
    codigo: DataTypes.STRING(18),
    tpInstituicao: DataTypes.STRING(255),
    municipio: DataTypes.STRING(150),
  }, {});
  Instituicao.associate = (models) => {
    Instituicao.hasMany(models.Pessoa, { foreignKey: 'instituicaoId' });
  };
  Instituicao.beforeSave((instituicao, _options) => {
    normalizarTextoInstituicao(instituicao);
  });
  return Instituicao;
};
