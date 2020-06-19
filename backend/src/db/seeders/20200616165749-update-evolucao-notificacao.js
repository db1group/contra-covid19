const capitalize = (value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.sequelize.transaction(async (t) => {
    try {
      const evolucoes = await queryInterface
        .sequelize.query(`select n.id, ne."createdAt", ne."tpEvolucao" from "Notificacao" n
        join "NotificacaoEvolucao" ne on ne."notificacaoId" = n.id
        order by n.id;`,
        { type: Sequelize.QueryTypes.SELECT });

      const notificacoes = evolucoes.reduce((a, c) => (a.includes(c.id) ? a : [...a, c.id]), []);
      console.info('Total Evolucoes ', evolucoes.length, 'Total notificacoes ', notificacoes.length);
      // eslint-disable-next-line no-restricted-syntax
      for (const id of notificacoes) {
        const notifEvolucao = evolucoes.filter((n) => n.id === id);
        let updateValues = notifEvolucao.map((evolucao) => ([
          [`dt${capitalize(evolucao.tpEvolucao)}`], evolucao.createdAt,
        ]));
        updateValues = updateValues.reduce((a, c) => {
          const [data, valor] = c;
          // eslint-disable-next-line no-param-reassign
          a[data] = valor;
          return a;
        }, {});

        // eslint-disable-next-line no-await-in-loop
        await queryInterface.bulkUpdate('Notificacao', updateValues, { id }, { transaction: t });
      }
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }),

  down: (queryInterface) => queryInterface.sequelize.query(`UPDATE "Notificacao" SET
    "dtSuspeito" = null,
    "dtConfirmado" = null,
    "dtDescartado" = null,
    "dtCurado" = null,
    "dtEncerrado" = null,
    "dtObito" = null`, null, {}),
};
