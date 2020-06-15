const Sequelize = require('sequelize');
const excel = require('excel4node');
const fs = require('fs');
const moment = require('moment');
const models = require('../models');

const TIME_ZONE = {
  AMERICA_SAO_PAULO: 'America/Sao_Paulo',
};

const PAIS = { BRASIL: 'Brasil' };

const DIRETORIO = 'excel';

exports.gerarExcel = async (req, res) => {
  try {
    const { dataInicial, dataFinal } = req.query;

    console.info(`inicio - criarDataParaFiltro ${new Date()}`);
    const dataInicialFiltro = this.criarDataInicialParaFiltro(dataInicial);
    const dataFinalFiltro = this.criarDataFinalParaFiltro(dataFinal);
    console.info(`fim - criarDataParaFiltro ${new Date()}`);

    console.info(`inicio consulta ${new Date()}`);
    const notificacoes = await this.consultarNotificacoes(dataInicialFiltro, dataFinalFiltro);
    console.info(`fim consulta ${new Date()}`);

    if (!fs.existsSync(DIRETORIO)) {
      fs.mkdirSync(DIRETORIO);
    }

    const wb = new excel.Workbook({
      jszip: {
        compression: 'DEFLATE',
      },
    });
    const ws = wb.addWorksheet('Planilha1');

    this.setarColunas(ws);
    console.info(`inicio setarNotificacao ${new Date()}`);
    this.setarNotificacao(ws, notificacoes);
    console.info(`fim setarNotificacao ${new Date()}`);

    console.info(`inicio escrever excel ${new Date()}`);
    wb.writeToBuffer().then((buffer) => {
      res.write(buffer);
      res.end();
      console.info(`fim escrever excel ${new Date()}`);
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

this.setarNotificacao = (ws, notificacoes) => {
  let linha = 2;
  notificacoes.forEach((notificacao) => {
    this.setarCelulaDataComHora(ws, linha, 1, notificacao.criacaodanotificacao);
    this.setarCelulaDataSemHora(ws, linha, 2, notificacao.dataHoraNotificacao);
    this.setarCelulaHoraDaData(ws, linha, 3, notificacao.dataHoraNotificacao);
    this.setarCelula(ws, linha, 4, notificacao.usuarioDigitador);
    this.setarCelula(ws, linha, 5, notificacao.statusnotificacao);
    this.setarCelula(ws, linha, 6, notificacao.unidadeNotificante);
    this.setarCelula(ws, linha, 7, notificacao.cnesDaUnidadeNotificante);
    this.setarCelula(ws, linha, 8, notificacao.nomedonotificador);
    this.setarCelulaProfissaoDoNotificador(ws, linha, 9, notificacao);
    this.setarCelulaBooleanComSimNao(ws, linha, 10, notificacao.situacao1);
    this.setarCelulaBooleanComSimNao(ws, linha, 11, notificacao.situacao2);
    this.setarCelula(ws, linha, 12, notificacao.nomeDoPaciente);
    this.setarCelula(ws, linha, 13, notificacao.tipoDocumentoDoPaciente);
    this.setarCelulaTratandoStringVazia(
      ws, linha, 14, notificacao.numeroDoDocumentoDoPaciente,
    );
    this.setarCelula(ws, linha, 15, notificacao.sexoDoPaciente);
    this.setarCelulaComNumero(ws, linha, 16, notificacao.idadeDoPaciente);
    this.setarCelulaComDataGravadaSemHora(
      ws, linha, 17, notificacao.dataDeNascimentoDoPaciente,
    );
    this.setarCelula(ws, linha, 18, notificacao.pacienteGestante);
    this.setarCelulaTipoPeriodoGestacional(
      ws, linha, 19, notificacao.tipoPeriodoGestacionalDoPaciente,
    );
    this.setarCelula(ws, linha, 20, notificacao.racaCorDoPaciente);
    this.setarCelula(ws, linha, 21, notificacao.nomeDaMaeDoPaciente);
    this.setarCelula(ws, linha, 22, notificacao.enderecoDoPaciente);
    this.setarCelula(ws, linha, 23, notificacao.numeroDoEnderecoDoPaciente);
    this.setarCelula(ws, linha, 24, notificacao.bairroDoPaciente);
    this.setarCelula(ws, linha, 25, notificacao.municipioDoPaciente);
    this.setarCelula(ws, linha, 26, notificacao.uFDoMunicipioDoPaciente);
    this.setarCelula(ws, linha, 27, PAIS.BRASIL);
    this.setarCelula(ws, linha, 28, notificacao.telefoneResidencialDoPaciente);
    this.setarCelulaOutroTelefone(ws, linha, 29, notificacao);
    this.setarCelulaTratandoStringVazia(ws, linha, 30, notificacao.ocupacaoDoPaciente);
    this.setarCelula(ws, linha, 31, notificacao.tipoOcupacaoDoPaciente);
    this.setarCelula(ws, linha, 32, notificacao.tipoClassificacaoDoPaciente);
    // 4. SINAIS E SINTOMAS'
    // 4.1. SINTOMAS RESPIRATÓRIOS
    this.setarCelulaComDataGravadaSemHora(ws, linha, 33, notificacao.dataInicioDosSintomas);
    this.setarCelulaBooleanComSimNao(ws, linha, 34, notificacao.febreAferidaReferida);
    this.setarCelulaComNumero(ws, linha, 35, notificacao.temperaturaFebre);
    this.setarCelulaBooleanComSimNao(ws, linha, 36, notificacao.batimentoAsasNasais);
    this.setarCelulaBooleanComSimNao(ws, linha, 37, notificacao.cianoseCentral);
    this.setarCelulaBooleanComSimNao(ws, linha, 38, notificacao.congestaoNasal);
    this.setarCelulaBooleanComSimNao(ws, linha, 39, notificacao.coriza);
    this.setarCelulaBooleanComSimNao(ws, linha, 40, notificacao.dispneia);
    this.setarCelulaBooleanComSimNao(ws, linha, 41, notificacao.dorDeGarganta);
    this.setarCelulaBooleanComSimNao(ws, linha, 42, notificacao.saturacaoDeOximetriaDePulso);
    this.setarCelulaBooleanComSimNao(ws, linha, 43, notificacao.sibilo);
    this.setarCelulaBooleanComSimNao(ws, linha, 44, notificacao.taquipneia);
    this.setarCelulaBooleanComSimNao(ws, linha, 45, notificacao.tiragemIntercostal);
    this.setarCelulaBooleanComSimNao(ws, linha, 46, notificacao.tosse);
    this.setarCelulaBooleanComSimNao(ws, linha, 47, notificacao.escarro);
    // 4.2 OUTROS SINTOMAS
    this.setarCelulaBooleanComSimNao(ws, linha, 48, notificacao.adinamiaFraqueza);
    this.setarCelulaBooleanComSimNao(ws, linha, 49, notificacao.artralgia);
    this.setarCelulaBooleanComSimNao(ws, linha, 50, notificacao.calafrios);
    this.setarCelulaBooleanComSimNao(ws, linha, 51, notificacao.cefaleia);
    this.setarCelulaBooleanComSimNao(ws, linha, 52, notificacao.conjuntivite);
    this.setarCelulaBooleanComSimNao(ws, linha, 53, notificacao.diarreia);
    this.setarCelulaBooleanComSimNao(ws, linha, 54, notificacao.dificuldadeDeglutir);
    this.setarCelulaBooleanComSimNao(ws, linha, 55, notificacao.diminuicaoDePulsoPeriferico);
    this.setarCelulaBooleanComSimNao(ws, linha, 56, notificacao.gangliosLinfaticos);
    this.setarCelulaBooleanComSimNao(ws, linha, 57, notificacao.irritabilidadeConfusao);
    this.setarCelulaBooleanComSimNao(ws, linha, 58, notificacao.manchasVermelhas);
    this.setarCelulaBooleanComSimNao(ws, linha, 59, notificacao.mialgia);
    this.setarCelulaBooleanComSimNao(ws, linha, 60, notificacao.nauseaVomito);
    this.setarCelulaBooleanComSimNao(ws, linha, 61, notificacao.hipotensao);
    this.setarCelulaTratandoStringVazia(ws, linha, 62, notificacao.outrosSintomas);
    // 5. Realizou exame de imagem
    // Raio de tórax
    this.setarCelulaBooleanComSimNao(ws, linha, 63, notificacao.realizouExameDeImagem);
    this.setarCelulaBooleanComSimNao(ws, linha, 64, notificacao.raioXNormal);
    this.setarCelulaBooleanComSimNao(ws, linha, 65, notificacao.raioXInfiltrado);
    this.setarCelulaBooleanComSimNao(ws, linha, 66, notificacao.raioXConsolidacao);
    this.setarCelulaBooleanComSimNao(ws, linha, 67, notificacao.raioXMisto);
    this.setarCelulaTratandoStringVazia(ws, linha, 68, notificacao.raioXOutro);
    // Tomografia de tórax
    this.setarCelulaBooleanComSimNao(ws, linha, 69, notificacao.tomografiaNormal);
    this.setarCelulaBooleanComSimNao(ws, linha, 70, notificacao.tomografiaVitro);
    this.setarCelulaBooleanComSimNao(ws, linha, 71, notificacao.tomografiaDerrame);
    this.setarCelulaBooleanComSimNao(ws, linha, 72, notificacao.tomografiaLinfonodo);
    this.setarCelulaTratandoStringVazia(ws, linha, 73, notificacao.tomografiaOutro);
    // 6.Comorbidades Prévias/Fatores de Risco
    this.setarCelulaBooleanComSimNao(ws, linha, 74, notificacao.diabetesMellitus);
    this.setarCelulaBooleanComSimNao(ws, linha, 75, notificacao.doencaCardioVascularCronica);
    this.setarCelulaBooleanComSimNao(ws, linha, 76, notificacao.doencaHematologicaCronica);
    this.setarCelulaBooleanComSimNao(ws, linha, 77, notificacao.doencaHepaticaCronica);
    this.setarCelulaBooleanComSimNao(ws, linha, 78, notificacao.doencaNeurologicaCronica);
    this.setarCelulaBooleanComSimNao(ws, linha, 79, notificacao.doencaRenalCronica);
    this.setarCelulaBooleanComSimNao(ws, linha, 80, notificacao.hipertensao);
    this.setarCelulaBooleanComSimNao(ws, linha, 81, notificacao.imunodeficiencia);
    this.setarCelulaBooleanComSimNao(ws, linha, 82, notificacao.infeccaoHIV);
    this.setarCelulaBooleanComSimNao(ws, linha, 83, notificacao.neoplasia);
    this.setarCelulaBooleanComSimNao(ws, linha, 84, notificacao.obesidade);
    this.setarCelulaBooleanComSimNao(ws, linha, 85, notificacao.puerperaAte45DiasDoParto);
    this.setarCelulaBooleanComSimNao(ws, linha, 86, notificacao.tabagismo);
    this.setarCelulaBooleanComSimNao(ws, linha, 87, notificacao.sindromeDeDown);
    this.setarCelulaBooleanComSimNao(ws, linha, 88, notificacao.asma);
    this.setarCelulaBooleanComSimNao(ws, linha, 89, notificacao.outraPneumopatiaCronica);
    this.setarCelulaTratandoStringVazia(ws, linha, 90, notificacao.outrosComorbidades);
    // 7.Usou medicamento
    this.setarCelulaBooleanComSimNao(ws, linha, 91, notificacao.tamiflu);
    this.setarCelulaBooleanComSimNao(ws, linha, 92, notificacao.hidroxicloroquina);
    this.setarCelulaTratandoStringVazia(ws, linha, 93, notificacao.nomeMedicamento);
    // 8. Dados Laboratoriais
    this.setarCelulaBooleanComSimNao(
      ws, linha, 94, notificacao.coletaMaterialParaDiagnostico,
    );
    this.setarCelulaComDataGravadaSemHora(ws, linha, 95, notificacao.dataDaColeta);
    this.setarCelulaTratandoStringVazia(ws, linha, 96, notificacao.tipoLaboratorio);
    this.setarCelulaTratandoStringVazia(
      ws, linha, 97, notificacao.nomeLaboratorioEnvioMaterial,
    );
    this.setarCelulaTratandoStringVazia(ws, linha, 98, notificacao.metodoDeExame);
    // 9. Histórico de viagem
    this.setarCelulaBooleanComSimNao(ws, linha, 99, notificacao.historicoDeViagem);
    this.setarCelulaTratandoStringVazia(ws, linha, 100, notificacao.localDaViagem);
    this.setarCelulaComDataGravadaSemHora(ws, linha, 101, notificacao.dataDaViagem);
    // 10. Contato com suspeito
    this.setarCelulaTratandoStringVazia(ws, linha, 102, notificacao.contatoComSuspeito);
    this.setarCelulaTratandoStringVazia(
      ws, linha, 103, notificacao.localDoContatoComSuspeito,
    );
    this.setarCelulaTratandoStringVazia(ws, linha, 104, notificacao.nomeSuspeito);
    // 12. Outras informações'
    this.setarCelula(ws, linha, 105, notificacao.recebeuVacinaDaGripeNosUltimosDozeMeses);
    this.setarCelula(ws, linha, 106, notificacao.situacaoNoMomentoDaNotificacao);
    this.setarCelulaTratandoStringVazia(ws, linha, 107, notificacao.observacoes);
    linha += 1;
  });
};

this.setarCelulaProfissaoDoNotificador = (ws, linha, coluna, notificacao) => {
  const profissaoDoNotificador = this.retornarProfissionalDoNotificador(notificacao);

  this.setarCelularTratandoNulable(ws, linha, coluna, profissaoDoNotificador);
};

this.retornarProfissionalDoNotificador = (notificacao) => {
  const { nomeDaProfissao } = notificacao;

  if (nomeDaProfissao && nomeDaProfissao.trim().length > 0) {
    return nomeDaProfissao;
  }

  const { profissaoDoProfissionalDeSaude } = notificacao;

  if (profissaoDoProfissionalDeSaude && profissaoDoProfissionalDeSaude.trim().length > 0) {
    return profissaoDoProfissionalDeSaude;
  }

  return null;
};

this.setarCelulaOutroTelefone = (ws, linha, coluna, notificacao) => {
  const outroTelefone = this.retornarOutroTelefone(notificacao);

  this.setarCelularTratandoNulable(ws, linha, coluna, outroTelefone);
};


this.retornarOutroTelefone = (notificacao) => {
  const { telefoneCelularDoPaciente } = notificacao;
  if (telefoneCelularDoPaciente && telefoneCelularDoPaciente.trim().length > 0) {
    return telefoneCelularDoPaciente;
  }

  const { telefoneContatoDoPaciente } = notificacao;

  if (telefoneContatoDoPaciente && telefoneContatoDoPaciente.trim().length > 0) {
    return telefoneContatoDoPaciente;
  }

  return null;
};

this.setarCelula = (ws, linha, coluna, valorDaCelula) => {
  ws.cell(linha, coluna).string(valorDaCelula);
};

this.setarCelulaTratandoStringVazia = (ws, linha, coluna, valorDaCelula) => {
  if (!valorDaCelula || valorDaCelula.trim().length <= 0) {
    return;
  }

  this.setarCelula(ws, linha, coluna, valorDaCelula);
};

this.setarCelularTratandoNulable = (ws, linha, coluna, valorDaCelula) => {
  if (!valorDaCelula) {
    return;
  }

  this.setarCelula(ws, linha, coluna, valorDaCelula);
};

this.setarCelulaComNumero = (ws, linha, coluna, valorDaCelula) => {
  if (!valorDaCelula) {
    return;
  }

  const valorNumerico = valorDaCelula.toString().replace('.', ',');
  this.setarCelula(ws, linha, coluna, valorNumerico);
};

this.setarCelulaTipoPeriodoGestacional = (ws, linha, coluna, valorDaCelula) => {
  if (!valorDaCelula) {
    return;
  }

  const tipoPeriodoGestacional = this.retornarTipoPeriodoGestacional(valorDaCelula);
  this.setarCelularTratandoNulable(ws, linha, coluna, tipoPeriodoGestacional);
};

this.retornarTipoPeriodoGestacional = (tipoPeriodoGestacional) => {
  switch (tipoPeriodoGestacional) {
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

this.setarCelulaComDataGravadaSemHora = (ws, linha, coluna, data) => {
  if (!data) {
    return;
  }

  const valorDaCelula = moment.tz(data, TIME_ZONE.AMERICA_SAO_PAULO).format('DD/MM/YYYY');
  this.setarCelula(ws, linha, coluna, valorDaCelula);
};

this.setarCelulaBooleanComSimNao = (ws, linha, coluna, valorBoolean) => {
  if (typeof valorBoolean !== 'boolean') {
    return;
  }

  const valorDaCelula = valorBoolean ? 'Sim' : 'Não';
  this.setarCelula(ws, linha, coluna, valorDaCelula);
};

this.setarCelulaHoraDaData = (ws, linha, coluna, data) => {
  if (!data) {
    return;
  }

  const valorDaCelula = moment(data).tz(TIME_ZONE.AMERICA_SAO_PAULO).format('HH:mm');
  this.setarCelula(ws, linha, coluna, valorDaCelula);
};

this.setarCelulaDataComHora = (ws, linha, coluna, data) => {
  if (!data) {
    return;
  }

  const valorDaCelula = moment(data).tz(TIME_ZONE.AMERICA_SAO_PAULO).format('DD/MM/YYYY HH:mm:ss');
  this.setarCelula(ws, linha, coluna, valorDaCelula);
};

this.setarCelulaDataSemHora = (ws, linha, coluna, data) => {
  if (!data) {
    return;
  }

  const valorDaCelula = moment(data).tz(TIME_ZONE.AMERICA_SAO_PAULO).format('DD/MM/YYYY');
  this.setarCelula(ws, linha, coluna, valorDaCelula);
};

this.criarDataInicialParaFiltro = (data) => moment
  .tz(data, TIME_ZONE.AMERICA_SAO_PAULO).toISOString();

this.criarDataFinalParaFiltro = (data) => moment
  .tz(data, TIME_ZONE.AMERICA_SAO_PAULO).endOf('day').toISOString();

this.setarColunas = (ws) => {
  ws.cell(1, 1).string('Data hora da criação da Notificação');
  ws.cell(1, 2).string('Data da Notificação');
  ws.cell(1, 3).string('horaDaNotificacao');
  ws.cell(1, 4).string('usuarioDigitador');
  ws.cell(1, 5).string('statusNotificacao');
  ws.cell(1, 6).string('unidadeNotificante');
  ws.cell(1, 7).string('cNES');
  ws.cell(1, 8).string('nomeDoNotificador');
  ws.cell(1, 9).string('profissaoDoNotificador');
  ws.cell(1, 10).string('situacao1CasoSuspeito');
  ws.cell(1, 11).string('situacao2ContatoDeCasoSuspeitoOuConfirmado');
  ws.cell(1, 12).string('nomeDoPaciente');
  ws.cell(1, 13).string('tipoDocumentoDoPaciente');
  ws.cell(1, 14).string('documentoDoPaciente');
  ws.cell(1, 15).string('sexoDoPaciente');
  ws.cell(1, 16).string('idadeDoPaciente');
  ws.cell(1, 17).string('dataDeNascimentoDoPaciente');
  ws.cell(1, 18).string('gestante');
  ws.cell(1, 19).string('tipoPeriodoGestacional');
  ws.cell(1, 20).string('racaCorDoPaciente');
  ws.cell(1, 21).string('nomeDaMaeDoPaciente');
  ws.cell(1, 22).string('enderecoDoPaciente');
  ws.cell(1, 23).string('numeroDoEnderecoDoPaciente');
  ws.cell(1, 24).string('bairroDoPaciente');
  ws.cell(1, 25).string('municipioDoPaciente');
  ws.cell(1, 26).string('ufDoPaciente');
  ws.cell(1, 27).string('paisDoPaciente');
  ws.cell(1, 28).string('telefoneDoPaciente');
  ws.cell(1, 29).string('outroTelefoneDoPaciente');
  ws.cell(1, 30).string('ocupacaoDoPaciente');
  ws.cell(1, 31).string('tipoOcupacaoDoPaciente');
  ws.cell(1, 32).string('tipoClassificacaoPessoa');
  // 4. SINAIS E SINTOMAS'
  // 4.1. SINTOMAS RESPIRATÓRIOS
  ws.cell(1, 33).string('dataDeInicioDosSintomas');
  ws.cell(1, 34).string('febreAferidaReferida');
  ws.cell(1, 35).string('temperaturaFebre');
  ws.cell(1, 36).string('batimentoAsasNasais');
  ws.cell(1, 37).string('cianoseCentral');
  ws.cell(1, 38).string('congestaoNasal');
  ws.cell(1, 39).string('coriza');
  ws.cell(1, 40).string('dispneia');
  ws.cell(1, 41).string('dorDeGarganta');
  ws.cell(1, 42).string('saturacaoDeOximetriaDePulso');
  ws.cell(1, 43).string('sibilo');
  ws.cell(1, 44).string('taquipneia');
  ws.cell(1, 45).string('tiragemIntercostal');
  ws.cell(1, 46).string('tosse');
  ws.cell(1, 47).string('escarro');
  // 4.2 OUTROS SINTOMAS
  ws.cell(1, 48).string('adinamiaFraqueza');
  ws.cell(1, 49).string('artralgia');
  ws.cell(1, 50).string('calafrios');
  ws.cell(1, 51).string('cefaleia');
  ws.cell(1, 52).string('conjuntivite');
  ws.cell(1, 53).string('diarreia');
  ws.cell(1, 54).string('dificuldadeDeglutir');
  ws.cell(1, 55).string('diminuicaoDePulsoPeriferico');
  ws.cell(1, 56).string('gangliosLinfaticos');
  ws.cell(1, 57).string('irritabilidadeConfusao');
  ws.cell(1, 58).string('manchasVermelhas');
  ws.cell(1, 59).string('mialgia');
  ws.cell(1, 60).string('nauseaVomito');
  ws.cell(1, 61).string('hipotensao');
  ws.cell(1, 62).string('outrosSintomas');
  // 5. Realizou exame de imagem
  // Raio de tórax
  ws.cell(1, 63).string('realizouExameDeImagem');
  ws.cell(1, 64).string('raioXNormal');
  ws.cell(1, 65).string('raioXInfiltrado');
  ws.cell(1, 66).string('raioXConsolidacao');
  ws.cell(1, 67).string('raioXMisto');
  ws.cell(1, 68).string('raioXOutro');
  // Tomografia de tórax
  ws.cell(1, 69).string('tomografiaNormal');
  ws.cell(1, 70).string('tomografiaVidro');
  ws.cell(1, 71).string('tomografiaDerrame');
  ws.cell(1, 72).string('tomografiaLinfonodo');
  ws.cell(1, 73).string('tomografiaOutro');
  // 6.Comorbidades Prévias/Fatores de Risco
  ws.cell(1, 74).string('diabetesMellitus');
  ws.cell(1, 75).string('doencaCardioVascularCronica');
  ws.cell(1, 76).string('doencaHematologicaCronica');
  ws.cell(1, 77).string('doencaHepaticaCronica');
  ws.cell(1, 78).string('doencaNeurologicaCronica');
  ws.cell(1, 79).string('doencaRenalCronica');
  ws.cell(1, 80).string('hipertensao');
  ws.cell(1, 81).string('Imunodecifencia/imunodepressao');
  ws.cell(1, 82).string('infeccaoHIV');
  ws.cell(1, 83).string('neoplasia');
  ws.cell(1, 84).string('obesidade');
  ws.cell(1, 85).string('puerperaAte45DiasDoParto');
  ws.cell(1, 86).string('tabagismo');
  ws.cell(1, 87).string('sindromeDeDown');
  ws.cell(1, 88).string('asma');
  ws.cell(1, 89).string('outraPneumopatiaCronica');
  ws.cell(1, 90).string('outrosComorbidades');
  // 7.Usou medicamento
  ws.cell(1, 91).string('tamiflu');
  ws.cell(1, 92).string('hidroxicloroquina');
  ws.cell(1, 93).string('nomeMedicamento');
  // 8. Dados Laboratoriais
  ws.cell(1, 94).string('coletaMaterialParaDiagnostico');
  ws.cell(1, 95).string('dataDaColeta');
  ws.cell(1, 96).string('tipoLaboratorio');
  ws.cell(1, 97).string('nomeLaboratorioEnvioMaterial');
  ws.cell(1, 98).string('metodoDeExame');
  // 9. Histórico de viagem
  ws.cell(1, 99).string('historicoDeViagem');
  ws.cell(1, 100).string('localDaViagem');
  ws.cell(1, 101).string('dataDaViagem');
  // 10. Contato com suspeito
  ws.cell(1, 102).string('contatoComSuspeito');
  ws.cell(1, 103).string('localDoContatoComSuspeito');
  ws.cell(1, 104).string('nomeSuspeito');
  // 12. Outras informações'
  ws.cell(1, 105).string('recebeuVacinaDaGripeNosUltimosDozeMeses');
  ws.cell(1, 106).string('situacaoNoMomentoDaNotificacao');
  ws.cell(1, 107).string('observacoes');
};

this.consultarNotificacoes = async (dataInicial, dataFinal) => {
  const notificacoes = await models.sequelize.query(
    `SELECT "Notificacao"."nomeNotificador" AS nomeDoNotificador,
            "Notificacao"."status" AS statusnotificacao,
            "Notificacao"."createdAt" As criacaoDaNotificacao,
            "Pessoa"."nome" AS "nomeDoPaciente",
            "Pessoa"."dataDeNascimento" AS "dataDeNascimentoDoPaciente",
            "Pessoa"."sexo" AS "sexoDoPaciente",
            "Pessoa"."idade" AS "idadeDoPaciente",
            "Pessoa"."numeroDocumento" AS "numeroDoDocumentoDoPaciente",
            "Pessoa"."tipoDocumento" AS "tipoDocumentoDoPaciente",
            "Pessoa"."nomeDaMae" AS "nomeDaMaeDoPaciente",
            "Pessoa"."ocupacao" AS "ocupacaoDoPaciente",
            "Pessoa"."endereco" AS "enderecoDoPaciente",
            "Pessoa"."numero" AS "numeroDoEnderecoDoPaciente",
            "Pessoa"."telefoneResidencial" AS "telefoneResidencialDoPaciente",
            "Pessoa"."telefoneCelular" AS "telefoneCelularDoPaciente",
            "Pessoa"."telefoneContato" AS "telefoneContatoDoPaciente",
            "Pessoa"."gestante" AS "pacienteGestante",
            "Pessoa"."racaCor" AS "racaCorDoPaciente",
            "Pessoa"."tipoClassificacaoPessoa" AS "tipoClassificacaoDoPaciente",
            "Pessoa"."tipoPeriodoGestacional" AS "tipoPeriodoGestacionalDoPaciente",
            "Bairro"."nome" AS "bairroDoPaciente",
            "Ocupacao"."descricao" AS "tipoOcupacaoDoPaciente",
            "Municipio"."nome" AS "municipioDoPaciente",
            "Municipio"."uf" AS "uFDoMunicipioDoPaciente",
            "NotificacaoCovid19"."dataInicioDosSintomas",
            "NotificacaoCovid19"."dataHoraNotificacao",
            "NotificacaoCovid19"."coriza",
            "NotificacaoCovid19"."tosse",
            "NotificacaoCovid19"."dorDeGarganta",
            "NotificacaoCovid19"."mialgia",
            "NotificacaoCovid19"."escarro",
            "NotificacaoCovid19"."sibilo",
            "NotificacaoCovid19"."batimentoAsasNasais",
            "NotificacaoCovid19"."dispneia",
            "NotificacaoCovid19"."taquipneia",
            "NotificacaoCovid19"."tiragemIntercostal",
            "NotificacaoCovid19"."saturacaoDeOximetriaDePulso",
            "NotificacaoCovid19"."cianoseCentral",
            "NotificacaoCovid19"."febreAferidaReferida",
            "NotificacaoCovid19"."temperaturaFebre",
            "NotificacaoCovid19"."congestaoNasal",
            "NotificacaoCovid19"."diminuicaoDePulsoPeriferico",
            "NotificacaoCovid19"."hipotensao",
            "NotificacaoCovid19"."diarreia",
            "NotificacaoCovid19"."adinamiaFraqueza",
            "NotificacaoCovid19"."artralgia",
            "NotificacaoCovid19"."calafrios",
            "NotificacaoCovid19"."conjuntivite",
            "NotificacaoCovid19"."dificuldadeDeglutir",
            "NotificacaoCovid19"."gangliosLinfaticos",
            "NotificacaoCovid19"."irritabilidadeConfusao",
            "NotificacaoCovid19"."manchasVermelhas",
            "NotificacaoCovid19"."cefaleia",
            "NotificacaoCovid19"."nauseaVomito",
            "NotificacaoCovid19"."outrosSintomas",
            "NotificacaoCovid19"."puerperaAte45DiasDoParto",
            "NotificacaoCovid19"."sindromeDeDown",
            "NotificacaoCovid19"."diabetesMellitus",
            "NotificacaoCovid19"."imunodeficiencia",
            "NotificacaoCovid19"."doencaCardioVascularCronica",
            "NotificacaoCovid19"."doencaHepaticaCronica",
            "NotificacaoCovid19"."doencaNeurologicaCronica",
            "NotificacaoCovid19"."doencaRenalCronica",
            "NotificacaoCovid19"."doencaHematologicaCronica",
            "NotificacaoCovid19"."asma",
            "NotificacaoCovid19"."hipertensao",
            "NotificacaoCovid19"."infeccaoHIV",
            "NotificacaoCovid19"."neoplasia",
            "NotificacaoCovid19"."tabagismo",
            "NotificacaoCovid19"."outraPneumopatiaCronica",
            "NotificacaoCovid19"."obesidade",
            "NotificacaoCovid19"."outrosComorbidades",
            "NotificacaoCovid19"."tamiflu",
            "NotificacaoCovid19"."hidroxicloroquina",
            "NotificacaoCovid19"."nomeMedicamento",
            "NotificacaoCovid19"."historicoDeViagem",
            "NotificacaoCovid19"."dataDaViagem",
            "NotificacaoCovid19"."localDaViagem",
            "NotificacaoCovid19"."recebeuVacinaDaGripeNosUltimosDozeMeses",
            "NotificacaoCovid19"."situacao1",
            "NotificacaoCovid19"."situacao2",
            "NotificacaoCovid19"."coletaMaterialParaDiagnostico",
            "NotificacaoCovid19"."tipoLaboratorio",
            "NotificacaoCovid19"."nomeLaboratorioEnvioMaterial",
            "NotificacaoCovid19"."dataDaColeta",
            "NotificacaoCovid19"."metodoDeExame",
            "NotificacaoCovid19"."realizouExameDeImagem",
            "NotificacaoCovid19"."raioXNormal",
            "NotificacaoCovid19"."raioXInfiltrado",
            "NotificacaoCovid19"."raioXConsolidacao",
            "NotificacaoCovid19"."raioXMisto",
            "NotificacaoCovid19"."raioXOutro",
            "NotificacaoCovid19"."tomografiaNormal",
            "NotificacaoCovid19"."tomografiaVitro",
            "NotificacaoCovid19"."tomografiaDerrame",
            "NotificacaoCovid19"."tomografiaLinfonodo",
            "NotificacaoCovid19"."tomografiaOutro",
            "NotificacaoCovid19"."observacoes",
            "NotificacaoCovid19"."contatoComSuspeito",
            "NotificacaoCovid19"."localDoContatoComSuspeito",
            "NotificacaoCovid19"."nomeSuspeito",
            "NotificacaoCovid19"."situacaoNoMomentoDaNotificacao",
            "UnidadeSaude"."nome" AS "unidadeNotificante",
            "UnidadeSaude"."cnes" AS "cnesDaUnidadeNotificante",
            "Profissao"."nome" AS "nomeDaProfissao",
            "ProfissionalSaude"."profissao" AS "profissaoDoProfissionalDeSaude",
            "User"."email" AS "usuarioDigitador"
       FROM "Notificacao"
 INNER JOIN "Pessoa" ON "Notificacao"."pessoaId" = "Pessoa"."id"
 INNER JOIN "Bairro" ON "Pessoa"."bairroId" = "Bairro"."id"
 INNER JOIN "Ocupacao" ON "Pessoa"."ocupacaoId" = "Ocupacao"."id"
 INNER JOIN "Municipio" ON "Pessoa"."municipioId" = "Municipio"."id"
 INNER JOIN "NotificacaoCovid19" ON "Notificacao"."id" = "NotificacaoCovid19"."notificacaoId"
 INNER JOIN "UnidadeSaude" ON "Notificacao"."unidadeSaudeId" = "UnidadeSaude"."id"
 INNER JOIN "User" ON "Notificacao"."userId" = "User"."id"
  LEFT JOIN "ProfissionalSaude" ON "Notificacao"."notificadorId" = "ProfissionalSaude"."id"
  LEFT JOIN "Profissao" ON "Notificacao"."profissaoId" = "Profissao"."id"
      WHERE "Notificacao"."status" != 'EXCLUIDA'
        AND "NotificacaoCovid19"."dataHoraNotificacao" BETWEEN :dataInicial AND :dataFinal
   ORDER BY "Notificacao"."createdAt" DESC;`,
    {
      replacements: {
        dataInicial,
        dataFinal,
      },
    },
    { type: Sequelize.QueryTypes.SELECT },
  );

  return notificacoes[0];
};
