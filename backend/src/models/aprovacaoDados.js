module.exports = (sequelize, DataTypes) => {
  const AprovacaoDados = sequelize.define('AprovacaoDados', {
    data: DataTypes.DATEONLY,
    aprovado: DataTypes.BOOLEAN,
  }, {});
  AprovacaoDados.associate = (_models) => {
  };
  return AprovacaoDados;
};
