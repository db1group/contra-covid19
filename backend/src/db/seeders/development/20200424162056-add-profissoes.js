
const uuidv4 = require('uuid/v4');

module.exports = {
  up: (queryInterface) => queryInterface
    .bulkInsert('Profissao', [
      {
        id: uuidv4(),
        nome: 'TECNICO/AUXILIAR DE ENFERMAGEM',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        nome: 'TECNICO/AUXILIAR ADMINISTRATIVO',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        nome: 'OUTRO PROFISSIONAL DA SAUDE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Profissao', null, {}),
};
