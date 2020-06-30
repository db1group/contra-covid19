const { normalizarTexto } = require('../lib/normalizar-texto');

const normalizarTextoPerfil = (perfil) => {
  // eslint-disable-next-line no-param-reassign
  perfil.nome = normalizarTexto(perfil.nome);
};

module.exports = (sequelize, DataTypes) => {
  const Perfil = sequelize.define('Perfil', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
  }, {});
  Perfil.associate = (models) => {
    Perfil.hasMany(models.NotificaLeitoPerfil, { foreignKey: 'perfilId' });
  };
  Perfil.beforeSave((perfil, _options) => {
    normalizarTextoPerfil(perfil);
  });
  return Perfil;
};
