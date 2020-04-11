"use strict";
module.exports = (sequelize, DataTypes) => {
  const Pessoa = sequelize.define(
    "Pessoa",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      nome: DataTypes.STRING(150),
      dataDeNascimento: DataTypes.DATE,
      sexo: DataTypes.ENUM("M", "F"),
      idade: DataTypes.INTEGER,
      numeroDocumento: DataTypes.STRING(18),
      tipoDocumento: DataTypes.ENUM("CPF", "RG", "CNH", "SUS"),
      nomeDaMae: DataTypes.STRING(150),
      ocupacao: DataTypes.STRING(60),
      endereco: DataTypes.STRING(150),
      numero: DataTypes.STRING(12),
      bairroId: DataTypes.UUID,
      telefoneResidencial: DataTypes.STRING(12),
      telefoneContato: DataTypes.STRING(12),
      telefoneCelular: DataTypes.STRING(12),
    },
    {}
  );
  Pessoa.associate = function (models) {
    Pessoa.belongsTo(models.Bairro);
  };
  return Pessoa;
};
