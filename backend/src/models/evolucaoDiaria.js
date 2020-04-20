module.exports = (sequelize, DataTypes) => {
  const EvolucaoDiaria = sequelize.define('EvolucaoDiaria', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nomeMunicipio: {
      type: DataTypes.STRING(12),
      validate: {
        notEmpty: true,
        isNull: false,
      },
    },
    dataEvolucao: {
      type: DataTypes.DATE,
      validate: {
        isNull: false,
      },
    },
    qtdSuspeito: {
      type: DataTypes.INTEGER,
      validate: {
        isNull: false,
      },
    },
    qtdConfirmado: {
      type: DataTypes.INTEGER,
      validate: {
        isNull: false,
      },
    },
    qtdDescartado: {
      type: DataTypes.INTEGER,
      validate: {
        isNull: false,
      },
    },
    qtdCura: {
      type: DataTypes.INTEGER,
      validate: {
        isNull: false,
      },
    },
    qtdObito: {
      type: DataTypes.INTEGER,
      validate: {
        isNull: false,
      },
    },
    qtdEncerrado: {
      type: DataTypes.INTEGER,
      validate: {
        isNull: false,
      },
    },
  });
  return EvolucaoDiaria;
};
