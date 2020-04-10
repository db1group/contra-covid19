'use strict';
module.exports = (sequelize, DataTypes) => {
  const NotificacaoHistorico = sequelize.define('NotificacaoHistorico', {
    notificacaoId: DataTypes.INTEGER,
    sintomatico: DataTypes.BOOLEAN,
    dataInicioDosSintomas: DataTypes.DATE,
    dataHoraNotificação: DataTypes.DATE,
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
    outrosComorbidades: DataTypes.TEXT
  }, {});
  NotificacaoHistorico.associate = function (models) {
    NotificacaoHistorico.belongsTo(models.Notificacao);
  };
  return NotificacaoHistorico;
};