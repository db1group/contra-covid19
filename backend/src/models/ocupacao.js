module.exports = (sequelize, DataTypes) => {
  const Ocupacao = sequelize.define(
    'Ocupacao',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      descricao: {
        type: DataTypes.STRING(80),
        allowNull: false,
      },
      classificacao: DataTypes.STRING(60),
    },
    {},
  );
  Ocupacao.associate = (_) => { };
  return Ocupacao;
};
