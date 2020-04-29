
module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('NotificacaoCovid19', 'congestaoNasal', {
      type: Sequelize.BOOLEAN,
    }),
    queryInterface.addColumn('NotificacaoCovid19', 'tiragemIntercostal', {
      type: Sequelize.BOOLEAN,
    }),
    queryInterface.addColumn('NotificacaoCovid19', 'adiamiaFraqueza', {
      type: Sequelize.BOOLEAN,
    }),
    queryInterface.addColumn('NotificacaoCovid19', 'artralgia', {
      type: Sequelize.BOOLEAN,
    }),
    queryInterface.addColumn('NotificacaoCovid19', 'calafrios', {
      type: Sequelize.BOOLEAN,
    }),
    queryInterface.addColumn('NotificacaoCovid19', 'conjuntivite', {
      type: Sequelize.BOOLEAN,
    }),
    queryInterface.addColumn('NotificacaoCovid19', 'dificuldadeDeglutir', {
      type: Sequelize.BOOLEAN,
    }),
    queryInterface.addColumn('NotificacaoCovid19', 'gangliosLinfaticos', {
      type: Sequelize.BOOLEAN,
    }),
    queryInterface.addColumn('NotificacaoCovid19', 'irritabilidadeConfusao', {
      type: Sequelize.BOOLEAN,
    }),
    queryInterface.addColumn('NotificacaoCovid19', 'manchasVermelhar', {
      type: Sequelize.BOOLEAN,
    }),
    queryInterface.addColumn('NotificacaoCovid19', 'tabagismo', {
      type: Sequelize.BOOLEAN,
    }),
    queryInterface.addColumn('NotificacaoCovid19', 'hipertensao', {
      type: Sequelize.BOOLEAN,
    }),
    queryInterface.addColumn('NotificacaoCovid19', 'infeccaoHIV', {
      type: Sequelize.BOOLEAN,
    }),
    queryInterface.addColumn('NotificacaoCovid19', 'neoplasia', {
      type: Sequelize.BOOLEAN,
    }),
    queryInterface.addColumn('NotificacaoCovid19', 'realizouExameDeImagem', {
      type: Sequelize.BOOLEAN,
    }),
    queryInterface.addColumn('NotificacaoCovid19', 'raioXNormal', {
      type: Sequelize.BOOLEAN,
    }),
    queryInterface.addColumn('NotificacaoCovid19', 'raioXInfiltrado', {
      type: Sequelize.BOOLEAN,
    }),
    queryInterface.addColumn('NotificacaoCovid19', 'raioxXConsolidacao', {
      type: Sequelize.BOOLEAN,
    }),
    queryInterface.addColumn('NotificacaoCovid19', 'raioXMisto', {
      type: Sequelize.BOOLEAN,
    }),
    queryInterface.addColumn('NotificacaoCovid19', 'raioXOutro', {
      type: Sequelize.STRING,
    }),
    queryInterface.addColumn('NotificacaoCovid19', 'tomografiaNormal', {
      type: Sequelize.BOOLEAN,
    }),
    queryInterface.addColumn('NotificacaoCovid19', 'tomografiaVitro', {
      type: Sequelize.BOOLEAN,
    }),
    queryInterface.addColumn('NotificacaoCovid19', 'tomografiaDerrame', {
      type: Sequelize.BOOLEAN,
    }),
    queryInterface.addColumn('NotificacaoCovid19', 'tomografiaLinfonodo', {
      type: Sequelize.BOOLEAN,
    }),
    queryInterface.addColumn('NotificacaoCovid19', 'tomografiaOutro', {
      type: Sequelize.STRING,
    }),
    queryInterface.addColumn('NotificacaoCovid19', 'dataDaColeta', {
      type: Sequelize.DATE,
    }),
    queryInterface.addColumn('NotificacaoCovid19', 'metodoDeExame', {
      type: Sequelize.STRING(12),
    }),
    queryInterface.addColumn('NotificacaoCovid19', 'contatoComSuspeito', {
      type: Sequelize.STRING(12),
    }),
    queryInterface.addColumn('NotificacaoCovid19', 'localDoContatoComSuspeito', {
      type: Sequelize.STRING(14),
    }),
    queryInterface.addColumn('NotificacaoCovid19', 'localDoContatoComSuspeitoOutro', {
      type: Sequelize.STRING,
    }),
    queryInterface.addColumn('NotificacaoCovid19', 'nomeSuspeito', {
      type: Sequelize.STRING,
    }),
    queryInterface.addColumn('NotificacaoCovid19', 'situacaoNoMomentoDaNotificacao', {
      type: Sequelize.STRING(26),
    }),
    queryInterface.addColumn('NotificacaoCovid19', 'febreAferidaReferida', {
      type: Sequelize.BOOLEAN,
    }),
    queryInterface.addColumn('NotificacaoCovid19', 'temperaturaFebre', {
      type: Sequelize.STRING,
    }),
    queryInterface.changeColumn('NotificacaoCovid19', 'recebeuVacinaDaGripeNosUltimosDozeMeses', {
      type: Sequelize.STRING(8),
    }),
  ]),

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('NotificacaoCovid19', 'congestaoNasal', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'tiragemIntercostal', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'adiamiaFraqueza', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'artralgia', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'calafrios', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'conjuntivite', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'dificuldadeDeglutir', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'gangliosLinfaticos', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'irritabilidadeConfusao', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'manchasVermelhar', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'tabagismo', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'hipertensao', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'infeccaoHIV', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'neoplasia', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'diminuicaoDePulsoPeriferico', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'realizouExameDeImagem', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'raioXNormal', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'raioXInfiltrado', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'raioxXConsolidacao', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'raioXMisto', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'raioXOutro', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'tomografiaNormal', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'tomografiaVitro', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'tomografiaDerrame', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'tomografiaLinfonodo', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'tomografiaOutro', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'dataDaColeta', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'metodoDeExame', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'contatoComSuspeito', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'localDoContatoComSuspeito', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'localDoContatoComSuspeitoOutro', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'nomeSuspeito', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'situacaoNoMomentoDaNotificacao', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'febreAferidaReferida', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'temperaturaFebre', { transaction });
      await queryInterface.removeColumn('NotificacaoCovid19', 'recebeuVacinaDaGripeNosUltimosDozeMeses', { transaction });
      await queryInterface.addColumn('NotificacaoCovid19', 'recebeuVacinaDaGripeNosUltimosDozeMeses', {
        type: Sequelize.BOOLEAN,
      }, { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
