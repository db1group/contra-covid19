/* eslint-disable no-param-reassign */

module.exports = (sequelize, DataTypes) => sequelize.define('FechamentoNotificacaoCovid19', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  dataFechamento: {
    allowNull: false,
    type: DataTypes.DATEONLY,
  },
  casosNotificados: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  acompanhados: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  casosEncerrados: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  confirmados: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  curados: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  obitos: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  emIsolamentoDomiciliar: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('ABERTO', 'REABERTO', 'FECHADO'),
    defaultValue: 'FECHADO',
  },
  descartados: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  municipioId: {
    type: DataTypes.UUID,
  },
}, {
  indexes: [{
    name: 'FechamentoNotificacaoCovid19_dataMunicipio_key',
    unique: true,
    fields: ['dataFechamento', 'municipioId'],
  }],
});
