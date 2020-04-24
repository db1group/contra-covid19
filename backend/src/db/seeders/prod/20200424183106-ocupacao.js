const uuidv4 = require('uuid/v4');

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Ocupacao', [
    {
      id: uuidv4(),
      descricao: 'Trabalhador/Profissional de Saúde',
      classificacao: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      descricao: 'Estudante da área de Saúde',
      classificacao: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      descricao: 'Trabalhador/Profissional de Laboratório',
      classificacao: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      descricao: 'Profissional de segurança pública',
      classificacao: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      descricao: 'Outro',
      classificacao: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Ocupacao', null, {}),
};
