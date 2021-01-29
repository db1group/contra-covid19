module.exports = (sequelize, DataTypes) => sequelize.define('Taxa', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  dtfechamento: DataTypes.DATEONLY,
  positividade: DataTypes.DOUBLE,
  ocupacao: DataTypes.DOUBLE,
});
