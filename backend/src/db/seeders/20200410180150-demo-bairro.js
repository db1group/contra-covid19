"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Bairro",
      [
        {
          id: "766c6aa8-d587-4a23-b022-8744009bfd37",
          nome: "Parque Lagoa Dourada",
          municipioId: "ac3227a1-8a09-4b5f-93cd-d6ca43b637a2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Bairro", null, {});
  },
};
