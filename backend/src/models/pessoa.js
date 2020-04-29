/* eslint-disable no-param-reassign */
const { normalizarTexto } = require('../lib/normalizar-texto');

const normalizarTextoPessoa = (pessoa) => {
  pessoa.nome = normalizarTexto(pessoa.nome);
  pessoa.nomeDaMae = normalizarTexto(pessoa.nomeDaMae);
  pessoa.ocupacao = normalizarTexto(pessoa.ocupacao);
  pessoa.endereco = normalizarTexto(pessoa.endereco);
};

module.exports = (sequelize, DataTypes) => {
  const Pessoa = sequelize.define('Pessoa', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(150),
      validate: {
        notEmpty: true,
        len: [3, 150],
      },
    },
    dataDeNascimento: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true,
        isNotGreaterTomorrow(value) {
          const actualValue = new Date(value);
          let tomorrow = new Date();
          tomorrow = new Date(
            tomorrow.getFullYear(),
            tomorrow.getMonth(),
            tomorrow.getDate(),
          );
          if (actualValue >= tomorrow) {
            throw new Error('Não pode informar uma data futura');
          }
        },
      },
    },
    sexo: DataTypes.ENUM('M', 'F'),
    idade: DataTypes.INTEGER,
    numeroDocumento: DataTypes.STRING(18),
    tipoDocumento: DataTypes.ENUM('CPF', 'RG', 'CNH', 'SUS'),
    nomeDaMae: DataTypes.STRING(150),
    ocupacao: DataTypes.STRING(60),
    endereco: DataTypes.STRING(150),
    numero: DataTypes.STRING(12),
    bairroId: DataTypes.UUID,
    municipioId: DataTypes.UUID,
    telefoneResidencial: DataTypes.STRING(12),
    telefoneContato: DataTypes.STRING(12),
    telefoneCelular: DataTypes.STRING(12),
    gestante: DataTypes.ENUM('SIM', 'NAO', 'NAO_APLICADO'),
    racaCor: DataTypes.ENUM('BRANCA', 'PRETA', 'AMARELA', 'PARDA', 'INDIGENA', 'IGNORADO'),
    complemento: DataTypes.STRING(150),
    ocupacaoId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    tipoClassificacaoPessoa: DataTypes.ENUM('CRIANCA_ATE_12_ANOS', 'EM_SITUACAO_RUA', 'ESTRANGEIRO', 'INDIGENA', 'OUTRO'),
    cep: DataTypes.STRING(8),
  });
  Pessoa.associate = (models) => {
    Pessoa.belongsTo(models.Bairro, { foreignKey: 'bairroId' });
    Pessoa.belongsTo(models.Municipio, { foreignKey: 'municipioId' });
    Pessoa.belongsTo(models.Ocupacao, { foreignKey: 'ocupacaoId' });
  };
  Pessoa.beforeCreate(async (pessoa) => {
    normalizarTextoPessoa(pessoa);
  });
  Pessoa.beforeUpdate(async (pessoa) => {
    normalizarTextoPessoa(pessoa);
  });
  return Pessoa;
};
