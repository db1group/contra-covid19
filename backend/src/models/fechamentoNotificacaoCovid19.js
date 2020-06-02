/* eslint-disable no-param-reassign */

module.exports = (sequelize, DataTypes) => sequelize.define('FechamentoNotificacaoCovid19', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  dataFechamento: {
    allowNull: false,
    type: DataTypes.DATE,
    unique: true,
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
});
