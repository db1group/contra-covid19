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
    saturacaoDeOximetriaDePulso: DataTypes.BOOLEAN,
    cianoseCentral: DataTypes.BOOLEAN,
    diminuicaoDePulsoPeriferico: DataTypes.BOOLEAN,
    hipotensao: DataTypes.BOOLEAN,
    diarreia: DataTypes.BOOLEAN,
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
    recebeuVacinaDaGripeNosUltimosDozeMeses: DataTypes.BOOLEAN,
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
    observacoes: DataTypes.TEXT,
  }, {});
  NotificacaoCovid19.associate = (models) => {
    NotificacaoCovid19.belongsTo(models.Notificacao, { foreignKey: 'notificacaoId' });
  };
  return NotificacaoCovid19;
};
