"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Pessoa",
      [
        {
          id: "dfc15106-36a4-43ee-9ca6-4ce21c8f98e6",
          nome: "Maykon Capellari",
          dataDeNascimento: new Date(),
          sexo: "Masculino",
          idade: 33,
          numeroDocumento: "16857253501",
          tipoDocumento: "CPF",
          nomeDaMae: "Jacira Capellari",
          ocupacao: "Desenvolvedor",
          endereco: "Rua Nardina Rodrigues Johansen",
          numero: "152",
          bairroId: "ac3227a1-8a09-4b5f-93cd-d6ca43b637a2",
          telefoneResidencial: "44991051563",
          telefoneContato: "44991051563",
          telefoneCelular: "44991051563",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Pessoa", null, {});
  },
};
