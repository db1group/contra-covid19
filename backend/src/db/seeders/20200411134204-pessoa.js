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
          sexo: "M",
          idade: 33,
          numeroDocumento: "16857253501",
          tipoDocumento: "CPF",
          nomeDaMae: "Jacira Capellari",
          ocupacao: "Desenvolvedor",
          endereco: "Rua Nardina Rodrigues Johansen",
          numero: "152",
          bairroId: "766c6aa8-d587-4a23-b022-8744009bfd37",
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
