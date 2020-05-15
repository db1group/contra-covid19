const Sequelize = require('sequelize');
const geraExcel = require('./gera-excel-resource');
const models = require('../models');

const { Op } = Sequelize;

// eslint-disable-next-line sonarjs/cognitive-complexity
exports.gerarExcel = async (req, res) => {
  try {
    const paisBrasil = 'Brasil';
    const { dataInicial, dataFinal } = req.query;

    const dataInicialFiltro = geraExcel.criarDataInicialParaFiltro(dataInicial);
    const dataFinalFiltro = geraExcel.criarDataFinalParaFiltro(dataFinal);

    const notificacoes = await models.Notificacao.findAll({
      where: {
        status: {
          [Op.ne]: 'EXCLUIDA',
        },
      },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: models.Pessoa,
          include: [
            {
              model: models.Bairro,
            },
            { model: models.Ocupacao },
            { model: models.Municipio },
          ],
        },
        {
          model: models.NotificacaoCovid19,
          where: {
            dataHoraNotificacao: {
              [Op.between]: [dataInicialFiltro, dataFinalFiltro],
            },
          },
        },
        { model: models.UnidadeSaude },
        { model: models.ProfissionalSaude },
        { model: models.Profissao },
        { model: models.User },
      ],
    });

    const listaTemp = notificacoes.map((t) => t.dataValues);
    const lista = listaTemp.map((t) => ({
      dataHoraDaCriacaoDaNotificacao: geraExcel.retornarDataComHora(t, 'createdAt'),
      dataDaNotificacao: geraExcel.retornarDataSemHora(t.NotificacaoCovid19, 'dataHoraNotificacao'),
      horaDaNotificacao: geraExcel.retornarHoraDaData(t.NotificacaoCovid19, 'dataHoraNotificacao'),
      usuarioDigitador: geraExcel.retornarCampo(t.User, 'email'),
      statusNotificacao: geraExcel.retornarCampo(t, 'status'),
      unidadeNotificante: t.UnidadeSaude ? t.UnidadeSaude.nome : null,
      cNES: t.UnidadeSaude ? t.UnidadeSaude.cnes : null,
      nomeDoNotificador: t.nomeNotificador,
      profissaoDoNotificador: this.retornarProfissionalNotificador(t),
      situacao1CasoSuspeito: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'situacao1'),
      situacao2ContatoDeCasoSuspeitoOuConfirmado: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'situacao2'),
      nomeDoPaciente: t.Pessoa ? t.Pessoa.nome : null,
      tipoDocumentoDoPaciente: geraExcel.retornarCampo(t.Pessoa, 'tipoDocumento'),
      documentoDoPaciente: geraExcel.retornarCampo(t.Pessoa, 'numeroDocumento'),
      sexoDoPaciente: t.Pessoa ? t.Pessoa.sexo : null,
      idadeDoPaciente: t.Pessoa ? t.Pessoa.idade : null,
      dataDeNascimentoDoPaciente: geraExcel.retornarDataGravadaSemHora(t.Pessoa, 'dataDeNascimento'),
      gestante: t.Pessoa ? t.Pessoa.gestante : null,
      tipoPeriodoGestacional: this.retornarTipoPeriodoGestacional(t),
      racaCorDoPaciente: t.Pessoa ? t.Pessoa.racaCor : null,
      nomeDaMaeDoPaciente: t.Pessoa ? t.Pessoa.nomeDaMae : null,
      enderecoDoPaciente: t.Pessoa ? t.Pessoa.endereco : null,
      numeroDoEnderecoDoPaciente: t.Pessoa ? t.Pessoa.numero : null,
      bairroDoPaciente: t.Pessoa && t.Pessoa.Bairro ? t.Pessoa.Bairro.nome : null,
      municipioDoPaciente: this.retornarMunicipioDoPaciente(t),
      ufDoPaciente: this.retornarUFDoPaciente(t),
      paisDoPaciente: paisBrasil,
      telefoneDoPaciente: t.Pessoa ? t.Pessoa.telefoneResidencial : null,
      outroTelefoneDoPaciente: this.retornarOutroTelefone(t),
      ocupacaoDoPaciente: geraExcel.retornarCampo(t.Pessoa, 'ocupacao'),
      tipoOcupacaoDoPaciente: geraExcel.retornarCampo(t.Pessoa.Ocupacao, 'descricao'),
      tipoClassificacaoPessoa: geraExcel.retornarCampo(t.Pessoa, 'tipoClassificacaoPessoa'),
      // 4. SINAIS E SINTOMAS:
      // 4.1. SINTOMAS RESPIRATÓRIOS
      dataDeInicioDosSintomas: geraExcel.retornarDataGravadaSemHora(t.NotificacaoCovid19, 'dataInicioDosSintomas'),
      febreAferidaReferida: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'febreAferidaReferida'),
      temperaturaFebre: t.NotificacaoCovid19 ? t.NotificacaoCovid19.temperaturaFebre : null,
      batimentoAsasNasais: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'batimentoAsasNasais'),
      cianoseCentral: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'cianoseCentral'),
      congestaoNasal: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'congestaoNasal'),
      coriza: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'coriza'),
      dispneia: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'dispneia'),
      dorDeGarganta: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'dorDeGarganta'),
      saturacaoDeOximetriaDePulso: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'saturacaoDeOximetriaDePulso'),
      sibilo: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'sibilo'),
      taquipneia: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'taquipneia'),
      tiragemIntercostal: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'tiragemIntercostal'),
      tosse: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'tosse'),
      escarro: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'escarro'),
      // 4.2 OUTROS SINTOMAS
      adinamiaFraqueza: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'adinamiaFraqueza'),
      artralgia: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'artralgia'),
      calafrios: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'calafrios'),
      cefaleia: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'cefaleia'),
      conjuntivite: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'conjuntivite'),
      diarreia: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'diarreia'),
      dificuldadeDeglutir: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'dificuldadeDeglutir'),
      diminuicaoDePulsoPeriferico: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'diminuicaoDePulsoPeriferico'),
      gangliosLinfaticos: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'gangliosLinfaticos'),
      irritabilidadeConfusao: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'irritabilidadeConfusao'),
      manchasVermelhas: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'manchasVermelhas'),
      mialgia: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'mialgia'),
      nauseaVomito: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'nauseaVomito'),
      hipotensao: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'hipotensao'),
      outrosSintomas: t.NotificacaoCovid19 ? t.NotificacaoCovid19.outrosSintomas : null,
      // 5. Realizou exame de imagem
      // Raio de tórax
      realizouExameDeImagem: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'realizouExameDeImagem'),
      raioXNormal: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'raioXNormal'),
      raioXInfiltrado: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'raioXInfiltrado'),
      raioXConsolidacao: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'raioXConsolidacao'),
      raioXMisto: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'raioXMisto'),
      raioXOutro: t.NotificacaoCovid19 ? t.NotificacaoCovid19.raioXOutro : null,
      // Tomografia de tórax
      tomografiaNormal: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'tomografiaNormal'),
      tomografiaVidro: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'tomografiaVitro'),
      tomografiaDerrame: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'tomografiaDerrame'),
      tomografiaLinfonodo: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'tomografiaLinfonodo'),
      tomografiaOutro: t.NotificacaoCovid19 ? t.NotificacaoCovid19.tomografiaOutro : null,
      // 6.Comorbidades Prévias/Fatores de Risco
      diabetesMellitus: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'diabetesMellitus'),
      doencaCardioVascularCronica: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'doencaCardioVascularCronica'),
      doencaHematologicaCronica: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'doencaHematologicaCronica'),
      doencaHepaticaCronica: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'doencaHepaticaCronica'),
      doencaNeurologicaCronica: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'doencaNeurologicaCronica'),
      doencaRenalCronica: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'doencaRenalCronica'),
      hipertensao: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'hipertensao'),
      imunodeficiencia: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'imunodeficiencia'),
      infeccaoHIV: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'infeccaoHIV'),
      neoplasia: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'neoplasia'),
      obesidade: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'obesidade'),
      puerperaAte45DiasDoParto: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'puerperaAte45DiasDoParto'),
      tabagismo: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'tabagismo'),
      sindromeDeDown: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'sindromeDeDown'),
      asma: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'asma'),
      outraPneumopatiaCronica: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'outraPneumopatiaCronica'),
      outrosComorbidades: t.NotificacaoCovid19 ? t.NotificacaoCovid19.outrosComorbidades : null,
      // 7.Usou medicamento
      tamiflu: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'tamiflu'),
      hidroxicloroquina: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'hidroxicloroquina'),
      nomeMedicamento: geraExcel.retornarCampo(t.NotificacaoCovid19, 'nomeMedicamento'),
      // 8. Dados Laboratoriais
      coletaMaterialParaDiagnostico: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'coletaMaterialParaDiagnostico'),
      dataDaColeta: geraExcel.retornarDataGravadaSemHora(t.NotificacaoCovid19, 'dataDaColeta'),
      tipoLaboratorio: geraExcel.retornarCampo(t.NotificacaoCovid19, 'tipoLaboratorio'),
      nomeLaboratorioEnvioMaterial: geraExcel.retornarCampo(t.NotificacaoCovid19, 'nomeLaboratorioEnvioMaterial'),
      metodoDeExame: t.NotificacaoCovid19 ? t.NotificacaoCovid19.metodoDeExame : null,
      // 9. Histórico de viagem
      historicoDeViagem: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'historicoDeViagem'),
      localDaViagem: t.NotificacaoCovid19 ? t.NotificacaoCovid19.localDaViagem : null,
      dataDaViagem: geraExcel.retornarDataGravadaSemHora(t.NotificacaoCovid19, 'dataDaViagem'),
      // 10. Contato com suspeito
      contatoComSuspeito: t.NotificacaoCovid19 ? t.NotificacaoCovid19.contatoComSuspeito : null,
      localDoContatoComSuspeito: geraExcel.retornarCampo(t.NotificacaoCovid19, 'localDoContatoComSuspeito'),
      nomeSuspeito: t.NotificacaoCovid19 ? t.NotificacaoCovid19.nomeSuspeito : null,
      // 12. Outras informações:
      recebeuVacinaDaGripeNosUltimosDozeMeses: geraExcel.retornarCampo(t.NotificacaoCovid19, 'recebeuVacinaDaGripeNosUltimosDozeMeses'),
      situacaoNoMomentoDaNotificacao: geraExcel.retornarCampo(t.NotificacaoCovid19, 'situacaoNoMomentoDaNotificacao'),
      observacoes: geraExcel.retornarCampo(t.NotificacaoCovid19, 'observacoes'),
    }
    ));

    const colunas = [
      { nomeColuna: 'Data hora da criação da Notificação', nomeCampo: 'dataHoraDaCriacaoDaNotificacao' },
      { nomeColuna: 'Data da Notificação', nomeCampo: 'dataDaNotificacao' },
      { nomeColuna: 'horaDaNotificacao', nomeCampo: 'horaDaNotificacao' },
      { nomeColuna: 'usuarioDigitador', nomeCampo: 'usuarioDigitador' },
      { nomeColuna: 'statusNotificacao', nomeCampo: 'statusNotificacao' },
      { nomeColuna: 'unidadeNotificante', nomeCampo: 'unidadeNotificante' },
      { nomeColuna: 'cNES', nomeCampo: 'cNES' },
      { nomeColuna: 'nomeDoNotificador', nomeCampo: 'nomeDoNotificador' },
      { nomeColuna: 'profissaoDoNotificador', nomeCampo: 'profissaoDoNotificador' },
      { nomeColuna: 'situacao1CasoSuspeito', nomeCampo: 'situacao1CasoSuspeito' },
      { nomeColuna: 'situacao2ContatoDeCasoSuspeitoOuConfirmado', nomeCampo: 'situacao2ContatoDeCasoSuspeitoOuConfirmado' },
      { nomeColuna: 'nomeDoPaciente', nomeCampo: 'nomeDoPaciente' },
      { nomeColuna: 'tipoDocumentoDoPaciente', nomeCampo: 'tipoDocumentoDoPaciente' },
      { nomeColuna: 'documentoDoPaciente', nomeCampo: 'documentoDoPaciente' },
      { nomeColuna: 'sexoDoPaciente', nomeCampo: 'sexoDoPaciente' },
      { nomeColuna: 'idadeDoPaciente', nomeCampo: 'idadeDoPaciente' },
      { nomeColuna: 'dataDeNascimentoDoPaciente', nomeCampo: 'dataDeNascimentoDoPaciente' },
      { nomeColuna: 'gestante', nomeCampo: 'gestante' },
      { nomeColuna: 'tipoPeriodoGestacional', nomeCampo: 'tipoPeriodoGestacional' },
      { nomeColuna: 'racaCorDoPaciente', nomeCampo: 'racaCorDoPaciente' },
      { nomeColuna: 'nomeDaMaeDoPaciente', nomeCampo: 'nomeDaMaeDoPaciente' },
      { nomeColuna: 'enderecoDoPaciente', nomeCampo: 'enderecoDoPaciente' },
      { nomeColuna: 'numeroDoEnderecoDoPaciente', nomeCampo: 'numeroDoEnderecoDoPaciente' },
      { nomeColuna: 'bairroDoPaciente', nomeCampo: 'bairroDoPaciente' },
      { nomeColuna: 'municipioDoPaciente', nomeCampo: 'municipioDoPaciente' },
      { nomeColuna: 'ufDoPaciente', nomeCampo: 'ufDoPaciente' },
      { nomeColuna: 'paisDoPaciente', nomeCampo: 'paisDoPaciente' },
      { nomeColuna: 'telefoneDoPaciente', nomeCampo: 'telefoneDoPaciente' },
      { nomeColuna: 'outroTelefoneDoPaciente', nomeCampo: 'outroTelefoneDoPaciente' },
      { nomeColuna: 'ocupacaoDoPaciente', nomeCampo: 'ocupacaoDoPaciente' },
      { nomeColuna: 'tipoOcupacaoDoPaciente', nomeCampo: 'tipoOcupacaoDoPaciente' },
      { nomeColuna: 'tipoClassificacaoPessoa', nomeCampo: 'tipoClassificacaoPessoa' },
      // 4. SINAIS E SINTOMAS'
      // 4.1. SINTOMAS RESPIRATÓRIOS
      { nomeColuna: 'dataDeInicioDosSintomas', nomeCampo: 'dataDeInicioDosSintomas' },
      { nomeColuna: 'febreAferidaReferida', nomeCampo: 'febreAferidaReferida' },
      { nomeColuna: 'temperaturaFebre', nomeCampo: 'temperaturaFebre' },
      { nomeColuna: 'batimentoAsasNasais', nomeCampo: 'batimentoAsasNasais' },
      { nomeColuna: 'cianoseCentral', nomeCampo: 'cianoseCentral' },
      { nomeColuna: 'congestaoNasal', nomeCampo: 'congestaoNasal' },
      { nomeColuna: 'coriza', nomeCampo: 'coriza' },
      { nomeColuna: 'dispneia', nomeCampo: 'dispneia' },
      { nomeColuna: 'dorDeGarganta', nomeCampo: 'dorDeGarganta' },
      { nomeColuna: 'saturacaoDeOximetriaDePulso', nomeCampo: 'saturacaoDeOximetriaDePulso' },
      { nomeColuna: 'sibilo', nomeCampo: 'sibilo' },
      { nomeColuna: 'taquipneia', nomeCampo: 'taquipneia' },
      { nomeColuna: 'tiragemIntercostal', nomeCampo: 'tiragemIntercostal' },
      { nomeColuna: 'tosse', nomeCampo: 'tosse' },
      { nomeColuna: 'escarro', nomeCampo: 'escarro' },
      // 4.2 OUTROS SINTOMAS
      { nomeColuna: 'adinamiaFraqueza', nomeCampo: 'adinamiaFraqueza' },
      { nomeColuna: 'artralgia', nomeCampo: 'artralgia' },
      { nomeColuna: 'calafrios', nomeCampo: 'calafrios' },
      { nomeColuna: 'cefaleia', nomeCampo: 'cefaleia' },
      { nomeColuna: 'conjuntivite', nomeCampo: 'conjuntivite' },
      { nomeColuna: 'diarreia', nomeCampo: 'diarreia' },
      { nomeColuna: 'dificuldadeDeglutir', nomeCampo: 'dificuldadeDeglutir' },
      { nomeColuna: 'diminuicaoDePulsoPeriferico', nomeCampo: 'diminuicaoDePulsoPeriferico' },
      { nomeColuna: 'gangliosLinfaticos', nomeCampo: 'gangliosLinfaticos' },
      { nomeColuna: 'irritabilidadeConfusao', nomeCampo: 'irritabilidadeConfusao' },
      { nomeColuna: 'manchasVermelhas', nomeCampo: 'manchasVermelhas' },
      { nomeColuna: 'mialgia', nomeCampo: 'mialgia' },
      { nomeColuna: 'nauseaVomito', nomeCampo: 'nauseaVomito' },
      { nomeColuna: 'hipotensao', nomeCampo: 'hipotensao' },
      { nomeColuna: 'outrosSintomas', nomeCampo: 'outrosSintomas' },
      // 5. Realizou exame de imagem
      // Raio de tórax
      { nomeColuna: 'realizouExameDeImagem', nomeCampo: 'realizouExameDeImagem' },
      { nomeColuna: 'raioXNormal', nomeCampo: 'raioXNormal' },
      { nomeColuna: 'raioXInfiltrado', nomeCampo: 'raioXInfiltrado' },
      { nomeColuna: 'raioXConsolidacao', nomeCampo: 'raioXConsolidacao' },
      { nomeColuna: 'raioXMisto', nomeCampo: 'raioXMisto' },
      { nomeColuna: 'raioXOutro', nomeCampo: 'raioXOutro' },
      // Tomografia de tórax
      { nomeColuna: 'tomografiaNormal', nomeCampo: 'tomografiaNormal' },
      { nomeColuna: 'tomografiaVidro', nomeCampo: 'tomografiaVidro' },
      { nomeColuna: 'tomografiaDerrame', nomeCampo: 'tomografiaDerrame' },
      { nomeColuna: 'tomografiaLinfonodo', nomeCampo: 'tomografiaLinfonodo' },
      { nomeColuna: 'tomografiaOutro', nomeCampo: 'tomografiaOutro' },
      // 6.Comorbidades Prévias/Fatores de Risco
      { nomeColuna: 'diabetesMellitus', nomeCampo: 'diabetesMellitus' },
      { nomeColuna: 'doencaCardioVascularCronica', nomeCampo: 'doencaCardioVascularCronica' },
      { nomeColuna: 'doencaHematologicaCronica', nomeCampo: 'doencaHematologicaCronica' },
      { nomeColuna: 'doencaHepaticaCronica', nomeCampo: 'doencaHepaticaCronica' },
      { nomeColuna: 'doencaNeurologicaCronica', nomeCampo: 'doencaNeurologicaCronica' },
      { nomeColuna: 'doencaRenalCronica', nomeCampo: 'doencaRenalCronica' },
      { nomeColuna: 'hipertensao', nomeCampo: 'hipertensao' },
      { nomeColuna: 'Imunodecifencia/imunodepressao', nomeCampo: 'imunodeficiencia' },
      { nomeColuna: 'infeccaoHIV', nomeCampo: 'infeccaoHIV' },
      { nomeColuna: 'neoplasia', nomeCampo: 'neoplasia' },
      { nomeColuna: 'obesidade', nomeCampo: 'obesidade' },
      { nomeColuna: 'puerperaAte45DiasDoParto', nomeCampo: 'puerperaAte45DiasDoParto' },
      { nomeColuna: 'tabagismo', nomeCampo: 'tabagismo' },
      { nomeColuna: 'sindromeDeDown', nomeCampo: 'sindromeDeDown' },
      { nomeColuna: 'asma', nomeCampo: 'asma' },
      { nomeColuna: 'outraPneumopatiaCronica', nomeCampo: 'outraPneumopatiaCronica' },
      { nomeColuna: 'outrosComorbidades', nomeCampo: 'outrosComorbidades' },
      // 7.Usou medicamento
      { nomeColuna: 'tamiflu', nomeCampo: 'tamiflu' },
      { nomeColuna: 'hidroxicloroquina', nomeCampo: 'hidroxicloroquina' },
      { nomeColuna: 'nomeMedicamento', nomeCampo: 'nomeMedicamento' },
      // 8. Dados Laboratoriais
      { nomeColuna: 'coletaMaterialParaDiagnostico', nomeCampo: 'coletaMaterialParaDiagnostico' },
      { nomeColuna: 'dataDaColeta', nomeCampo: 'dataDaColeta' },
      { nomeColuna: 'tipoLaboratorio', nomeCampo: 'tipoLaboratorio' },
      { nomeColuna: 'nomeLaboratorioEnvioMaterial', nomeCampo: 'nomeLaboratorioEnvioMaterial' },
      { nomeColuna: 'metodoDeExame', nomeCampo: 'metodoDeExame' },
      // 9. Histórico de viagem
      { nomeColuna: 'historicoDeViagem', nomeCampo: 'historicoDeViagem' },
      { nomeColuna: 'localDaViagem', nomeCampo: 'localDaViagem' },
      { nomeColuna: 'dataDaViagem', nomeCampo: 'dataDaViagem' },
      // 10. Contato com suspeito
      { nomeColuna: 'contatoComSuspeito', nomeCampo: 'contatoComSuspeito' },
      { nomeColuna: 'localDoContatoComSuspeito', nomeCampo: 'localDoContatoComSuspeito' },
      { nomeColuna: 'nomeSuspeito', nomeCampo: 'nomeSuspeito' },
      // 12. Outras informações'
      { nomeColuna: 'recebeuVacinaDaGripeNosUltimosDozeMeses', nomeCampo: 'recebeuVacinaDaGripeNosUltimosDozeMeses' },
      { nomeColuna: 'situacaoNoMomentoDaNotificacao', nomeCampo: 'situacaoNoMomentoDaNotificacao' },
      { nomeColuna: 'observacoes', nomeCampo: 'observacoes' },
    ];

    await geraExcel.gerarExcel(colunas, lista, res);
    return undefined;
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
};

this.retornarTipoPeriodoGestacional = (notificacao) => {
  if (!notificacao) {
    return null;
  }

  if (!notificacao.Pessoa) {
    return null;
  }

  switch (notificacao.Pessoa.tipoPeriodoGestacional) {
    case 'PRIMEIRO_TRIMESTRE':
      return '1º Trimestre';
    case 'SEGUNDO_TRIMESTRE':
      return '2º Trimestre';
    case 'TERCEIRO_TRIMESTRE':
      return '3º Trimestre';
    case 'IDADE_GESTACIONAL_IGNORADA':
      return 'Idade gestacional ignorada';
    default:
      return null;
  }
};

this.retornarOutroTelefone = (notificacao) => {
  if (!notificacao) {
    return null;
  }

  if (!notificacao.Pessoa) {
    return null;
  }

  if (notificacao.Pessoa.telefoneCelular && notificacao.Pessoa.telefoneCelular.length > 0) {
    return notificacao.Pessoa.telefoneCelular;
  }

  if (notificacao.Pessoa.telefoneContato && notificacao.Pessoa.telefoneContato.length > 0) {
    return notificacao.Pessoa.telefoneContato;
  }

  return null;
};

exports.retornarProfissionalNotificador = (notificacao) => {
  if (!notificacao) {
    return null;
  }

  if (notificacao.Profissao) {
    return notificacao.Profissao.nome;
  }

  if (notificacao.ProfissionalSaude) {
    return notificacao.ProfissionalSaude.profissao;
  }

  return null;
};

exports.retornarMunicipioDoPaciente = (notificacao) => {
  if (!notificacao.Pessoa) {
    return null;
  }

  if (!notificacao.Pessoa.Municipio) {
    return null;
  }

  return notificacao.Pessoa.Municipio.nome;
};

exports.retornarUFDoPaciente = (notificacao) => {
  if (!notificacao.Pessoa) {
    return null;
  }

  if (!notificacao.Pessoa.Municipio) {
    return null;
  }

  return notificacao.Pessoa.Municipio.uf;
};
