const uuidv4 = require('uuid/v4');

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('User', [
    {
      id: uuidv4(),
      email: 'notificasaude@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      email: 'robson.cachoeira@db1.com.br',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      email: 'jessica.gracino@db1.com.br',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      email: 'ccih.kamila@santacasamaringa.com.br',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: uuidv4(),
      email: 'ccih.saomarcos@hotmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: uuidv4(),
      email: 'ccih@hbsm.net.br',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: uuidv4(),
      email: 'ccih@hbsm.org.br',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: uuidv4(),
      email: 'ccih@hcdemaringa.com.br',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: uuidv4(),
      email: 'ccih@hospitalmaringa.com.br',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: uuidv4(),
      email: 'eduardoribeiro@maringa.pr.gov.br',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: uuidv4(),
      email: 'hmm_laboratorio@maringa.pr.gov',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: uuidv4(),
      email: 'hum.covid19@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: uuidv4(),
      email: 'lab.qualidade@santacasamaringa.com.br',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: uuidv4(),
      email: 'lab@hospar.com.br',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: uuidv4(),
      email: 'lab-lac@uem.br',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: uuidv4(),
      email: 'marcos@hsr.org.br',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: uuidv4(),
      email: 'saude_vigilancia01@maringa.pr.gov.br',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: uuidv4(),
      email: 'saude_vigilancia02@maringa.pr.gov.br',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: uuidv4(),
      email: 'saude_vigilancia03@maringa.pr.gov.br',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: uuidv4(),
      email: 'scih@unimedmaringa.com.br',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: uuidv4(),
      email: 'upa_znorte@maringa.pr.gov.br',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('User', null, {}),
};
