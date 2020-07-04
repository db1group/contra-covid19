const { normalizarTexto } = require('../lib/normalizar-texto');

const normalizarTextoCausa = (perfil) => {
  // eslint-disable-next-line no-param-reassign
  perfil.causa = normalizarTexto(perfil.causa);
};

module.exports = (sequelize, DataTypes) => {
  const NotificaLeitoPerfil = sequelize.define('NotificaLeitoPerfil', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    perfilId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    causa: {
      allowNull: false,
      type: DataTypes.STRING(150),
    },
    notificaLeitoId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    controleLeitoId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    leitosUnidadeId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  }, {});
  NotificaLeitoPerfil.associate = (models) => {
    NotificaLeitoPerfil.belongsTo(models.Perfil, {
      foreignKey: 'perfilId',
    });
    NotificaLeitoPerfil.belongsTo(models.NotificaLeito, {
      foreignKey: 'notificaLeitoId',
    });
    NotificaLeitoPerfil.belongsTo(models.ControleLeito, {
      foreignKey: 'controleLeitoId',
    });
    NotificaLeitoPerfil.belongsTo(models.ControleLeito, {
      foreignKey: 'leitosUnidadeId', as: 'LeitosUnidade',
    });
  };
  NotificaLeitoPerfil.beforeSave((perfil, _options) => {
    normalizarTextoCausa(perfil);
  });
  return NotificaLeitoPerfil;
};
