module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize
    .query('update "Notificacao" set "dtEncerramento" = "updatedAt" where "status" = \'ENCERRADA\'',
      {
        raw: true,
        type: Sequelize.QueryTypes.UPDATE,
      }),
  down: (queryInterface) => queryInterface.bulkUpdate('Notificacao', { dtEncerramento: null }, {}),
};
