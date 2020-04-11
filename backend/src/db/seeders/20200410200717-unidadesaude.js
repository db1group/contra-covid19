"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "UnidadeSaude",
      [
        {
          id: "ac3227a1-8a09-4b5f-93cd-d6ca43b637a3",
          nome: "UPA jardim das flores",
          municipioId: "ac3227a1-8a09-4b5f-93cd-d6ca43b637a2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("UnidadeSaude", null, {});
  },
};
