const uuidv4 = require('uuid/v4');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const municipios = await queryInterface
      .sequelize.query('SELECT id FROM "Municipio"',
        { type: Sequelize.QueryTypes.SELECT });

    const bairros = municipios.map(({ id: municipioId }) => ({
      id: uuidv4(),
      nome: 'GERAL',
      municipioId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return queryInterface.bulkInsert('Bairro', bairros, {});
  },

  down: (queryInterface) => queryInterface.bulkDelete('Bairro', null, {}),
};
