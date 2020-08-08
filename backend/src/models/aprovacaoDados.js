module.exports = (sequelize, DataTypes) => {
  const AprovacaoDados = sequelize.define('AprovacaoDado', {
    data: DataTypes.DATEONLY,
    aprovado: DataTypes.BOOLEAN,
    municipioId: {
      type: DataTypes.UUID,
    },
  }, {});
  AprovacaoDados.associate = (_models) => {
  };
  return AprovacaoDados;
};
