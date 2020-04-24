module.exports = {
  up: (queryInterface) => queryInterface
    .bulkInsert('Municipio', [
      {
        id: 'ac3227a1-8a09-4b5f-93cd-d6ca43b637a2',
        nome: 'MARINGA',
        uf: 'PR',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Municipio', null, {}),
};
