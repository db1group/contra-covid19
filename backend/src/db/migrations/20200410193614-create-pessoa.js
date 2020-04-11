"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Pessoa", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        autoIncrement: false,
      },
      nome: {
        type: Sequelize.STRING(150),
      },
      dataDeNascimento: {
        type: Sequelize.DATE,
      },
      sexo: {
        type: Sequelize.STRING(18),
      },
      idade: {
        type: Sequelize.INTEGER,
      },
      numeroDocumento: {
        type: Sequelize.STRING(18),
      },
      tipoDocumento: {
        type: Sequelize.STRING(12),
      },
      nomeDaMae: {
        type: Sequelize.STRING(150),
      },
      ocupacao: {
        type: Sequelize.STRING(60),
      },
      endereco: {
        type: Sequelize.STRING(150),
      },
      numero: {
        type: Sequelize.STRING(12),
      },
      bairroId: {
        type: Sequelize.UUID,
        references: {
          model: "Bairro",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      telefoneResidencial: {
        type: Sequelize.STRING(12),
      },
      telefoneContato: {
        type: Sequelize.STRING(12),
      },
      telefoneCelular: {
        type: Sequelize.STRING(12),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Pessoa");
  },
};
