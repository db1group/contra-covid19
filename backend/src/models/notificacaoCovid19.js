module.exports = (sequelize, DataTypes) => {
  const NotificacaoCovid19 = sequelize.define('NotificacaoCovid19', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    notificacaoId: DataTypes.INTEGER,
    sintomatico: DataTypes.BOOLEAN,
    dataInicioDosSintomas: DataTypes.DATE,
    dataHoraNotificacao: DataTypes.DATE,
    coriza: DataTypes.BOOLEAN,
    tosseSeca: DataTypes.BOOLEAN,
    dorDeGarganta: DataTypes.BOOLEAN,
    mialgia: DataTypes.BOOLEAN,
    tosseProdutiva: DataTypes.BOOLEAN,
    sibilo: DataTypes.BOOLEAN,
    desconfortoRespiratorio: DataTypes.BOOLEAN,
    dispneia: DataTypes.BOOLEAN,
    taquipneia: DataTypes.BOOLEAN,
    tiragemIntercostal: DataTypes.BOOLEAN,
    saturacaoDeOximetriaDePulso: DataTypes.BOOLEAN,
    cianoseCentral: DataTypes.BOOLEAN,
    feberAferidaReferida: DataTypes.BOOLEAN,
    temperaturaFebre: DataTypes.TEXT,
    congestaoNasal: DataTypes.BOOLEAN,
    diminuicaoDePulsoPeriferico: DataTypes.BOOLEAN,
    hipotensao: DataTypes.BOOLEAN,
    diarreia: DataTypes.BOOLEAN,
    adiamiaFraqueza: DataTypes.BOOLEAN,
    artralgia: DataTypes.BOOLEAN,
    calafrios: DataTypes.BOOLEAN,
    conjuntivite: DataTypes.BOOLEAN,
    dificuldadeDeglutir: DataTypes.BOOLEAN,
    gangliosLinfaticos: DataTypes.BOOLEAN,
    irritabilidadeConfusao: DataTypes.BOOLEAN,
    manchasVermelhar: DataTypes.BOOLEAN,
    cefaleia: DataTypes.BOOLEAN,
    nausea: DataTypes.BOOLEAN,
    vomito: DataTypes.BOOLEAN,
    outrosSintomas: DataTypes.TEXT,
    puerperaAte45DiasDoParto: DataTypes.BOOLEAN,
    sindromeDeDown: DataTypes.BOOLEAN,
    diabetesMellitus: DataTypes.BOOLEAN,
    imunodeficiencia: DataTypes.BOOLEAN,
    doencaCardioVascularCronica: DataTypes.BOOLEAN,
    doencaHepaticaCronica: DataTypes.BOOLEAN,
    doencaNeurologicaCronica: DataTypes.BOOLEAN,
    doencaRenalCronica: DataTypes.BOOLEAN,
    doencaHematologicaCronica: DataTypes.BOOLEAN,
    asma: DataTypes.BOOLEAN,
    hipertensao: DataTypes.BOOLEAN,
    infeccaoHIV: DataTypes.BOOLEAN,
    neoplasia: DataTypes.BOOLEAN,
    tabagismo: DataTypes.BOOLEAN,
    outraPneumopatiaCronica: DataTypes.BOOLEAN,
    obesidade: DataTypes.BOOLEAN,
    outrosComorbidades: DataTypes.TEXT,
    medicacaoAntitermica: DataTypes.BOOLEAN,
    nomeMedicacaoAntitermica: DataTypes.STRING,
    medicacaoAnalgesica: DataTypes.BOOLEAN,
    nomeMedicacaoAnalgesica: DataTypes.STRING,
    medicacaoAntiflamatorio: DataTypes.BOOLEAN,
    nomeMedicacaoAntiflamatorio: DataTypes.STRING,
    medicacaoAntiviral: DataTypes.BOOLEAN,
    nomeMedicacaoAntiviral: DataTypes.STRING,
    historicoDeViagem: DataTypes.BOOLEAN,
    dataDaViagem: DataTypes.DATE,
    localDaViagem: DataTypes.STRING,
    recebeuVacinaDaGripeNosUltimosDozeMeses: DataTypes.ENUM('SIM', 'NAO', 'NAO_SABE'),
    situacao1: DataTypes.BOOLEAN,
    situacao2: DataTypes.BOOLEAN,
    nomeTeveContato: DataTypes.STRING,
    isolamentoDomiciliar: DataTypes.BOOLEAN,
    leitoComum: DataTypes.BOOLEAN,
    leitoUti: DataTypes.BOOLEAN,
    prontoSocorroOuAtendimento: DataTypes.BOOLEAN,
    coletaMaterialParaDiagnostico: DataTypes.BOOLEAN,
    laboratorioOficial: DataTypes.BOOLEAN,
    laboratorioRedePrivada: DataTypes.BOOLEAN,
    dataDaColeta: DataTypes.DATE,
    metodoDeExame: DataTypes.ENUM('RT-PCR', 'TESTE_RAPIDO'),
    realizouExameDeImagem: DataTypes.BOOLEAN,
    raioXNormal: DataTypes.BOOLEAN,
    raioXInfiltrado: DataTypes.BOOLEAN,
    raioxXConsolidacao: DataTypes.BOOLEAN,
    raioXMisto: DataTypes.BOOLEAN,
    raioXOutro: DataTypes.TEXT,
    tomografiaNormal: DataTypes.BOOLEAN,
    tomografiaVitro: DataTypes.BOOLEAN,
    tomografiaDerrame:DataTypes.BOOLEAN,
    tomografiaLinfonodo: DataTypes.BOOLEAN,
    tomografiaOutro: DataTypes.TEXT,
    observacoes: DataTypes.TEXT,
    contatoComSuspeito: DataTypes.ENUM('SUSPEITO', 'CONFIRMADO', 'SEM_CONTATO'),
    localDoContatoComSuspeito: DataTypes.ENUM('DOMICILIO', 'UNIDADE_SAUDE', 'LOCAL_TRABALHO'),
    localDoContatoComSuspeitoOutro: DataTypes.TEXT,
    nomeSuspeito: DataTypes.TEXT,
    situacaoNoMomentoDaNotificacao: DataTypes.ENUM('ALTA_ISOLAMENTO_DOMICILIAR', 'INTERNAMENTO_LEITO_COMUM', 'INTERNAMENTO_LEITO_UTI', 'EVOLUCAO_OBITO')
  }, {});
  NotificacaoCovid19.associate = (models) => {
    NotificacaoCovid19.belongsTo(models.Notificacao, { foreignKey: 'notificacaoId' });
  };
  return NotificacaoCovid19;
};
