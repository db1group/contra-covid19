
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

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('NotificacaoCovid19', 'congestaoNasal'),
    queryInterface.removeColumn('NotificacaoCovid19', 'tiragemIntercostal'),
    queryInterface.removeColumn('NotificacaoCovid19', 'adiamiaFraqueza'),
    queryInterface.removeColumn('NotificacaoCovid19', 'artralgia'),
    queryInterface.removeColumn('NotificacaoCovid19', 'calafrios'),
    queryInterface.removeColumn('NotificacaoCovid19', 'conjuntivite'),
    queryInterface.removeColumn('NotificacaoCovid19', 'dificuldadeDeglutir'),
    queryInterface.removeColumn('NotificacaoCovid19', 'gangliosLinfaticos'),
    queryInterface.removeColumn('NotificacaoCovid19', 'irritabilidadeConfusao'),
    queryInterface.removeColumn('NotificacaoCovid19', 'manchasVermelhar'),
    queryInterface.removeColumn('NotificacaoCovid19', 'tabagismo'),
    queryInterface.removeColumn('NotificacaoCovid19', 'hipertensao'),
    queryInterface.removeColumn('NotificacaoCovid19', 'infeccaoHIV'),
    queryInterface.removeColumn('NotificacaoCovid19', 'neoplasia'),
    queryInterface.removeColumn('NotificacaoCovid19', 'diminuicaoDePulsoPeriferico'),
    queryInterface.removeColumn('NotificacaoCovid19', 'realizouExameDeImagem'),
    queryInterface.removeColumn('NotificacaoCovid19', 'raioXNormal'),
    queryInterface.removeColumn('NotificacaoCovid19', 'raioXInfiltrado'),
    queryInterface.removeColumn('NotificacaoCovid19', 'raioxXConsolidacao'),
    queryInterface.removeColumn('NotificacaoCovid19', 'raioXMisto'),
    queryInterface.removeColumn('NotificacaoCovid19', 'raioXOutro'),
    queryInterface.removeColumn('NotificacaoCovid19', 'tomografiaNormal'),
    queryInterface.removeColumn('NotificacaoCovid19', 'tomografiaVitro'),
    queryInterface.removeColumn('NotificacaoCovid19', 'tomografiaDerrame'),
    queryInterface.removeColumn('NotificacaoCovid19', 'tomografiaLinfonodo'),
    queryInterface.removeColumn('NotificacaoCovid19', 'tomografiaOutro'),
    queryInterface.removeColumn('NotificacaoCovid19', 'dataDaColeta'),
    queryInterface.removeColumn('NotificacaoCovid19', 'metodoDeExame'),
    queryInterface.removeColumn('NotificacaoCovid19', 'contatoComSuspeito'),
    queryInterface.removeColumn('NotificacaoCovid19', 'localDoContatoComSuspeito'),
    queryInterface.removeColumn('NotificacaoCovid19', 'localDoContatoComSuspeitoOutro'),
    queryInterface.removeColumn('NotificacaoCovid19', 'nomeSuspeito'),
    queryInterface.removeColumn('NotificacaoCovid19', 'situacaoNoMomentoDaNotificacao'),
    queryInterface.removeColumn('NotificacaoCovid19', 'feberAferidaReferida'),
    queryInterface.removeColumn('NotificacaoCovid19', 'temperaturaFebre'),
    queryInterface.changeColumn('NotificacaoCovid19', 'recebeuVacinaDaGripeNosUltimosDozeMeses', {
      type: Sequelize.BOOLEAN,
    }),
  ]),
};
