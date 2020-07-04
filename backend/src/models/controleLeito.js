module.exports = (sequelize, DataTypes) => {
  const ControleLeito = sequelize.define('ControleLeito', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    qtEnfermariaCovid: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    qtUTIAdultaCovid: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    qtUTIPedCovid: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    qtUTINeoCovid: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    qtEnfermariaNormal: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    qtUTIAdultaNormal: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    qtUTIPedNormal: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    qtUTINeoNormal: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    qtEnfermariaPrivado: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    qtUTIAdultaPrivado: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    qtUTIPedPrivado: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    qtUTINeoPrivado: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {});
  ControleLeito.associate = (models) => {
    ControleLeito.hasMany(models.NotificaLeito, {
      foreignKey: 'controleLeitoId',
    });
    ControleLeito.hasMany(models.NotificaLeitoPerfil, {
      foreignKey: 'controleLeitoId',
    });
    ControleLeito.hasMany(models.NotificaLeitoPerfil, {
      foreignKey: 'leitosUnidadeId', as: 'LeitosUnidade',
    });
  };
  return ControleLeito;
};
