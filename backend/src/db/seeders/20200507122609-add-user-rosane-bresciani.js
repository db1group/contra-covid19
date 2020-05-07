
module.exports = {
  up: (queryInterface) => queryInterface
    .bulkInsert('User', [
      {
        id: '198cae44-5e67-4eb0-893c-fa3bbd61e165',
        email: 'rosane.bresciani@gtfoods.com.br',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('User', { id: '198cae44-5e67-4eb0-893c-fa3bbd61e165' }, {}),
};
