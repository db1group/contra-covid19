const uuidv4 = require('uuid/v4');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userEmailTest = 'robson.cachoeira@db1.com.br';
    const userEmailTest2 = 'jessica.gracino@db1.com.br';

    const [userTest, userTest2] = await queryInterface
      .sequelize.query(`SELECT id FROM "User" WHERE "email" in ('${userEmailTest}','${userEmailTest2}')`,
        {
          type: Sequelize.QueryTypes.SELECT,
        });

    const unidadeSaude = await queryInterface
      .sequelize.query('SELECT id FROM "UnidadeSaude"',
        {
          type: Sequelize.QueryTypes.SELECT,
        });

    const usersUnidadeSaude = [
      {
        id: uuidv4(),
        userId: userTest.id,
        unidadeSaudeId: unidadeSaude[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        userId: userTest2.id,
        unidadeSaudeId: unidadeSaude[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // user notificador
      {
        id: uuidv4(),
        userId: '2e439917-3f2a-45b2-9143-aac3bea760d6',
        unidadeSaudeId: unidadeSaude[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    return queryInterface.bulkInsert('UserUnidadeSaude', usersUnidadeSaude, {});
  },

  down: (queryInterface) => queryInterface.bulkDelete('UserUnidadeSaude', null, {}),
};
