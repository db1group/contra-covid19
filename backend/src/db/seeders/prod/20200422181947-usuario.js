
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('User', [{
    id: '2e439917-3f2a-45b2-9143-aac3bea760d6',
    email: 'notificador@notificasaude.com.br',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('User', null, {}),
};
