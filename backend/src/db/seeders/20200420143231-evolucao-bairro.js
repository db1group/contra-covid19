
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('EvolucaoBairro', [
    {
      id: '38262bb8-bc45-4b13-a0b6-a892c56a139f',
      dataEvolucao: new Date(),
      nomeMunicipio: 'Parque Lagoa Dourada',
      nomeBairro: 'Parque Lagoa Dourada',
      qtdSuspeito: 10,
      qtdConfirmado: 1,
      qtdDescartado: 8,
      qtdCura: 2,
      qtdObito: 0,
      qtdEncerrado: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('EvolucaoBairro', null, {}),
};
