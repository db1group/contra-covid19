module.exports = (sequelize, DataTypes) => {
  const Profissao = sequelize.define(
    'Profissao',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      nome: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
    },
    {},
  );
  Profissao.associate = (_) => { };
  return Profissao;
};
