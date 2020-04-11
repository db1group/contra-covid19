"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "ProfissionalSaude",
      [
        {
          id: "ac3227a1-8a09-4b5f-93cd-d6ca43b637a4",
          nome: "João da Selva",
          email: "joaoselva@email.com",
          profissao: "eletricista",
          unidadesaudeId: "ac3227a1-8a09-4b5f-93cd-d6ca43b637a3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("ProfissionalSaude", null, {});
  },
};
