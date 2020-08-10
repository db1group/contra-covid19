/* eslint-disable no-param-reassign */
const { normalizarTexto } = require('../lib/normalizar-texto');

const normalizarTextoUsuario = (usuario) => {
  usuario.nome = normalizarTexto(usuario.nome);
  usuario.email = usuario.email.toLowerCase();
};

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: DataTypes.STRING(150),
    keycloakUserId: DataTypes.UUID,
    nome: {
      type: DataTypes.STRING(150),
      validate: {
        notEmpty: true,
        len: [3, 150],
      },
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    municipioId: {
      type: DataTypes.UUID,
    },
  }, {});
  User.associate = (models) => {
    User.hasMany(models.UserUnidadeSaude, { foreignKey: 'userId' });
    User.belongsToMany(models.UnidadeSaude, { through: models.UserUnidadeSaude, foreignKey: 'unidadeSaudeId' });
    User.belongsTo(models.Municipio, { foreignKey: 'municipioId' });
  };
  User.beforeSave((usuario, _options) => {
    normalizarTextoUsuario(usuario);
  });
  return User;
};
