
module.exports = (sequelize, DataTypes) => {
  const Profissao = sequelize.define(
    'Profissao',
    {
      nome: DataTypes.STRING(60),
      allowNull: false,
    },
    {},
  );
  Profissao.associate = (_) => {};
  return Profissao;
};
