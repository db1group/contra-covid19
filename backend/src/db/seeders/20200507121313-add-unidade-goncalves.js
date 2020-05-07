
module.exports = {
  up: (queryInterface) => queryInterface
    .bulkInsert('UnidadeSaude', [
      {
        id: '9ffe3b33-a8e3-4e3c-858b-4c0d95e06a1e',
        nome: 'GONÇALVES & TORTOLA S/A',
        municipioId: 'ac3227a1-8a09-4b5f-93cd-d6ca43b637a2',
        cnes: '0133892',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('UnidadeSaude', { id: '9ffe3b33-a8e3-4e3c-858b-4c0d95e06a1e' }, {}),
};
