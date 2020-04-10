'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('NotificacaoHistorico', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        autoIncrement: false,
      },
      notificacaoId: {
        type: Sequelize.UUID,
        references: {
          model: 'Notificacao',
          key: 'id',
        },
      },
      sintomatico: {
        type: Sequelize.BOOLEAN
      },
      dataInicioDosSintomas: {
        type: Sequelize.DATE
      },
      dataHoraNotificação: {
        type: Sequelize.DATE
      },
      coriza: {
        type: Sequelize.BOOLEAN
      },
      tosseSeca: {
        type: Sequelize.BOOLEAN
      },
      dorDeGarganta: {
        type: Sequelize.BOOLEAN
      },
      mialgia: {
        type: Sequelize.BOOLEAN
      },
      tosseProdutiva: {
        type: Sequelize.BOOLEAN
      },
      sibilo: {
        type: Sequelize.BOOLEAN
      },
      desconfortoRespiratorio: {
        type: Sequelize.BOOLEAN
      },
      dispneia: {
        type: Sequelize.BOOLEAN
      },
      taquipneia: {
        type: Sequelize.BOOLEAN
      },
      saturacaoDeOximetriaDePulso: {
        type: Sequelize.BOOLEAN
      },
      cianoseCentral: {
        type: Sequelize.BOOLEAN
      },
      diminuicaoDePulsoPeriferico: {
        type: Sequelize.BOOLEAN
      },
      hipotensao: {
        type: Sequelize.BOOLEAN
      },
      diarreia: {
        type: Sequelize.BOOLEAN
      },
      cefaleia: {
        type: Sequelize.BOOLEAN
      },
      nausea: {
        type: Sequelize.BOOLEAN
      },
      vomito: {
        type: Sequelize.BOOLEAN
      },
      outrosSintomas: {
        type: Sequelize.TEXT
      },
      puerperaAte45DiasDoParto: {
        type: Sequelize.BOOLEAN
      },
      sindromeDeDown: {
        type: Sequelize.BOOLEAN
      },
      diabetesMellitus: {
        type: Sequelize.BOOLEAN
      },
      imunodeficiencia: {
        type: Sequelize.BOOLEAN
      },
      doencaCardioVascularCronica: {
        type: Sequelize.BOOLEAN
      },
      doencaHepaticaCronica: {
        type: Sequelize.BOOLEAN
      },
      doencaNeurologicaCronica: {
        type: Sequelize.BOOLEAN
      },
      doencaRenalCronica: {
        type: Sequelize.BOOLEAN
      },
      doencaHematologicaCronica: {
        type: Sequelize.BOOLEAN
      },
      asma: {
        type: Sequelize.BOOLEAN
      },
      outraPneumopatiaCronica: {
        type: Sequelize.BOOLEAN
      },
      obesidade: {
        type: Sequelize.BOOLEAN
      },
      outrosComorbidades: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('NotificacaoHistorico');
  }
};