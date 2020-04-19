module.exports = (sequelize, DataTypes) => {
  const ProfissionalSaude = sequelize.define('ProfissionalSaude', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    profissao: DataTypes.STRING,
    unidadesaudeId: DataTypes.UUID,
  }, {});
  ProfissionalSaude.associate = (_) => {
    // associations can be defined here
  };
  return ProfissionalSaude;
};
