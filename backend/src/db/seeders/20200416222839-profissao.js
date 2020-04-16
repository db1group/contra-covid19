"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Profissao",
      [
        {
          id: "28da7c76-d068-4d31-9013-358bed063b5d",
          nome: "Desenvolvedor de Sistemas",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Profissao", null, {});
  },
};
