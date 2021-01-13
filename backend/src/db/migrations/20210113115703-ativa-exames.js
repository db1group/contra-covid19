module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize
    .query(
      `update "Exame" set "ativo" = true where codigo::int in (1,27);
       update "Exame" set "ativo" = true where codigo::int >= 167 and codigo::int <= 184;
      `,
      {
        raw: true,
        type: Sequelize.QueryTypes.UPDATE,
      },
    ),
  down: (queryInterface) => queryInterface.bulkUpdate('Exame', { ativo: false }, {}),
};
