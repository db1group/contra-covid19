module.exports = (sequelize, DataTypes) => {
  const AprovacaoDado = sequelize.define('AprovacaoDado', {
    data: DataTypes.DATEONLY,
    aprovado: DataTypes.BOOLEAN,
    municipioId: {
      type: DataTypes.UUID,
    },
  }, {});
  AprovacaoDado.associate = (_models) => {
  };
  return AprovacaoDado;
};
