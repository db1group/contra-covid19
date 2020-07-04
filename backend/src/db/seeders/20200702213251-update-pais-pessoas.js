module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize
    .query('update "Pessoa" set "paisId" = 1 where "paisId" is null',
      {
        raw: true,
        type: Sequelize.QueryTypes.UPDATE,
      }),
  down: (queryInterface) => queryInterface.bulkUpdate('Pessoa', { paisId: null }, {}),
};
