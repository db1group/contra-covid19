const Sequelize = require('sequelize');
const geraExcel = require('./gera-excel-resource');
const models = require('../models');

const { Op } = Sequelize;


exports.gerarExcel = async (req, res) => {
  try {
    const paisBrasil = 'Brasil';
    const { dataInicial, dataFinal } = req.query;

    const dataInicialFiltro = `${dataInicial}T00:00:00.000-00:00`;
    const dataFinalFiltro = `${dataFinal}T23:59:59.000-00:00`;

    const notificacoes = await models.Notificacao.findAll({
      where: {
        createdAt: {
          [Op.between]: [dataInicialFiltro, dataFinalFiltro],
        },
      },
      include: [
        {
          model: models.Pessoa,
          include: [
            {
              model: models.Bairro,
              include: [
                models.Municipio,
              ],
            },
          ],
        },
        { model: models.UnidadeSaude },
        { model: models.ProfissionalSaude },
        { model: models.Profissao },
        { model: models.NotificacaoCovid19 },
      ],
    });

    const listaTemp = notificacoes.map((t) => t.dataValues);
    const lista = listaTemp.map((t) => ({
      dataDaNotificacao: geraExcel.retornarDataSemHora(t, 'createdAt'),
      horaDaNotificacao: geraExcel.retornarHoraDaData(t, 'createdAt'),
      unidadeNotificante: t.UnidadeSaude ? t.UnidadeSaude.nome : null,
      cNES: t.UnidadeSaude ? t.UnidadeSaude.cnes : null,
      nomeDoNotificador: t.ProfissionalSaude ? t.ProfissionalSaude.nome : t.nomeNotificador,
      profissaoDoNotificador: this.retornarProfissionalNotificador(t),
      situacao1CasoSuspeito: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'situacao1'),
      situacao2ContatoDeCasoSuspeitoOuConfirmado: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'situacao2'),
      nomeDoPaciente: t.Pessoa ? t.Pessoa.nome : null,
      cPFDoPaciente: t.Pessoa && t.Pessoa.tipoDocumento === 'CPF' ? t.Pessoa.numeroDocumento : null,
      sexoDoPaciente: t.Pessoa ? t.Pessoa.sexo : null,
      idadeDoPaciente: t.Pessoa ? t.Pessoa.idade : null,
      dataDeNascimentoDoPaciente: geraExcel.retornarDataSemHora(t.Pessoa, 'dataDeNascimento'),
      gestante: t.Pessoa ? t.Pessoa.gestante : null,
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
      ocupacaoDoPaciente: t.Pessoa ? t.Pessoa.ocupacao : null,
      // 4. SINAIS E SINTOMAS:
      // 4.1. SINTOMAS RESPIRATÓRIOS
      dataDeInicioDosSintomas: geraExcel.retornarDataSemHora(t.NotificacaoCovid19, 'dataInicioDosSintomas'),
      febreAferidaReferida: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'febreAferidaReferida'),
      temperaturaFebre: t.NotificacaoCovid19 ? t.NotificacaoCovid19.temperaturaFebre : null,
      cianoseCentral: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'cianoseCentral'),
      congestaoNasal: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'congestaoNasal'),
      coriza: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'coriza'),
      dispneia: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'dispneia'),
      dorDeGarganta: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'dorDeGarganta'),
      saturacaoDeOximetriaDePulso: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'saturacaoDeOximetriaDePulso'),
      sibilo: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'sibilo'),
      taquipneia: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'taquipneia'),
      tiragemIntercostal: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'tiragemIntercostal'),
      tosseSeca: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'tosseSeca'),
      tosseProdutiva: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'tosseProdutiva'),
      // 4.2 OUTROS SINTOMAS
      adiamiaFraqueza: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'adiamiaFraqueza'),
      artralgia: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'artralgia'),
      calafrios: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'calafrios'),
      cefaleia: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'cefaleia'),
      conjuntivite: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'conjuntivite'),
      diarreia: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'diarreia'),
      dificuldadeDeglutir: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'dificuldadeDeglutir'),
      diminuicaoDePulsoPeriferico: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'diminuicaoDePulsoPeriferico'),
      gangliosLinfaticos: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'gangliosLinfaticos'),
      irritabilidadeConfusao: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'irritabilidadeConfusao'),
      manchasVermelhar: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'manchasVermelhar'),
      mialgia: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'mialgia'),
      nausea: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'nausea'),
      vomito: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'vomito'),
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
      tomografiaVitro: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'tomografiaVitro'),
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
      outrosComorbidades: t.NotificacaoCovid19 ? t.NotificacaoCovid19.outrosComorbidades : null,
      // 7.Usou medicamento
      // NÃO FOI ACHADO
      // 8. Dados Laboratoriais
      coletaMaterialParaDiagnostico: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'coletaMaterialParaDiagnostico'),
      dataDaColeta: geraExcel.retornarDataSemHora(t.NotificacaoCovid19, 'dataDaColeta'),
      tipoLaboratorio: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'tipoLaboratorio'),
      nomeLaboratorioEnvioMaterial: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'nomeLaboratorioEnvioMaterial'),
      metodoDeExame: t.NotificacaoCovid19 ? t.NotificacaoCovid19.metodoDeExame : null,
      // 9. Histórico de viagem
      historicoDeViagem: geraExcel.preencherCampoBoolean(t.NotificacaoCovid19, 'historicoDeViagem'),
      localDaViagem: t.NotificacaoCovid19 ? t.NotificacaoCovid19.localDaViagem : null,
      dataDaViagem: geraExcel.retornarDataSemHora(t.NotificacaoCovid19, 'dataDaViagem'),
      // 10. Contato com suspeito
      contatoComSuspeito: t.NotificacaoCovid19 ? t.NotificacaoCovid19.contatoComSuspeito : null,
      localDoContatoComSuspeito: geraExcel.retornarCampo(t.NotificacaoCovid19, 'localDoContatoComSuspeito'),
      localDoContatoComSuspeitoOutro: geraExcel.retornarCampo(t.NotificacaoCovid19, 'localDoContatoComSuspeitoOutro'),
      nomeSuspeito: t.NotificacaoCovid19 ? t.NotificacaoCovid19.nomeSuspeito : null,
      // 12. Outras informações:
      recebeuVacinaDaGripeNosUltimosDozeMeses: geraExcel.retornarCampo(t.NotificacaoCovid19, 'recebeuVacinaDaGripeNosUltimosDozeMeses'),
      situacaoNoMomentoDaNotificacao: geraExcel.retornarCampo(t.NotificacaoCovid19, 'situacaoNoMomentoDaNotificacao'),
    }
    ));

    const colunas = [
      { nomeColuna: 'Data da Notificação', nomeCampo: 'dataDaNotificacao' },
      { nomeColuna: 'horaDaNotificacao', nomeCampo: 'horaDaNotificacao' },
      { nomeColuna: 'unidadeNotificante', nomeCampo: 'unidadeNotificante' },
      { nomeColuna: 'cNES', nomeCampo: 'cNES' },
      { nomeColuna: 'nomeDoNotificador', nomeCampo: 'nomeDoNotificador' },
      { nomeColuna: 'profissaoDoNotificador', nomeCampo: 'profissaoDoNotificador' },
      { nomeColuna: 'situacao1CasoSuspeito', nomeCampo: 'situacao1CasoSuspeito' },
      { nomeColuna: 'situacao2ContatoDeCasoSuspeitoOuConfirmado', nomeCampo: 'situacao2ContatoDeCasoSuspeitoOuConfirmado' },
      { nomeColuna: 'nomeDoPaciente', nomeCampo: 'nomeDoPaciente' },
      { nomeColuna: 'cPFDoPaciente', nomeCampo: 'cPFDoPaciente' },
      { nomeColuna: 'sexoDoPaciente', nomeCampo: 'sexoDoPaciente' },
      { nomeColuna: 'idadeDoPaciente', nomeCampo: 'idadeDoPaciente' },
      { nomeColuna: 'dataDeNascimentoDoPaciente', nomeCampo: 'dataDeNascimentoDoPaciente' },
      { nomeColuna: 'gestante', nomeCampo: 'gestante' },
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
      // 4. SINAIS E SINTOMAS'
      // 4.1. SINTOMAS RESPIRATÓRIOS
      { nomeColuna: 'dataDeInicioDosSintomas', nomeCampo: 'dataDeInicioDosSintomas' },
      { nomeColuna: 'febreAferidaReferida', nomeCampo: 'febreAferidaReferida' },
      { nomeColuna: 'temperaturaFebre', nomeCampo: 'temperaturaFebre' },
      { nomeColuna: 'cianoseCentral', nomeCampo: 'cianoseCentral' },
      { nomeColuna: 'congestaoNasal', nomeCampo: 'congestaoNasal' },
      { nomeColuna: 'coriza', nomeCampo: 'coriza' },
      { nomeColuna: 'dispneia', nomeCampo: 'dispneia' },
      { nomeColuna: 'dorDeGarganta', nomeCampo: 'dorDeGarganta' },
      { nomeColuna: 'saturacaoDeOximetriaDePulso', nomeCampo: 'saturacaoDeOximetriaDePulso' },
      { nomeColuna: 'sibilo', nomeCampo: 'sibilo' },
      { nomeColuna: 'taquipneia', nomeCampo: 'taquipneia' },
      { nomeColuna: 'tiragemIntercostal', nomeCampo: 'tiragemIntercostal' },
      { nomeColuna: 'tosseSeca', nomeCampo: 'tosseSeca' },
      { nomeColuna: 'tosseProdutiva', nomeCampo: 'tosseProdutiva' },
      // 4.2 OUTROS SINTOMAS
      { nomeColuna: 'adiamiaFraqueza', nomeCampo: 'adiamiaFraqueza' },
      { nomeColuna: 'artralgia', nomeCampo: 'artralgia' },
      { nomeColuna: 'calafrios', nomeCampo: 'calafrios' },
      { nomeColuna: 'cefaleia', nomeCampo: 'cefaleia' },
      { nomeColuna: 'conjuntivite', nomeCampo: 'conjuntivite' },
      { nomeColuna: 'diarreia', nomeCampo: 'diarreia' },
      { nomeColuna: 'dificuldadeDeglutir', nomeCampo: 'dificuldadeDeglutir' },
      { nomeColuna: 'diminuicaoDePulsoPeriferico', nomeCampo: 'diminuicaoDePulsoPeriferico' },
      { nomeColuna: 'gangliosLinfaticos', nomeCampo: 'gangliosLinfaticos' },
      { nomeColuna: 'irritabilidadeConfusao', nomeCampo: 'irritabilidadeConfusao' },
      { nomeColuna: 'manchasVermelhar', nomeCampo: 'manchasVermelhar' },
      { nomeColuna: 'mialgia', nomeCampo: 'mialgia' },
      { nomeColuna: 'nausea', nomeCampo: 'nausea' },
      { nomeColuna: 'vomito', nomeCampo: 'vomito' },
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
      { nomeColuna: 'tomografiaVitro', nomeCampo: 'tomografiaVitro' },
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
      { nomeColuna: 'imunodeficiencia', nomeCampo: 'imunodeficiencia' },
      { nomeColuna: 'infeccaoHIV', nomeCampo: 'infeccaoHIV' },
      { nomeColuna: 'neoplasia', nomeCampo: 'neoplasia' },
      { nomeColuna: 'obesidade', nomeCampo: 'obesidade' },
      { nomeColuna: 'puerperaAte45DiasDoParto', nomeCampo: 'puerperaAte45DiasDoParto' },
      { nomeColuna: 'tabagismo', nomeCampo: 'tabagismo' },
      { nomeColuna: 'outrosComorbidades', nomeCampo: 'outrosComorbidades' },
      // 7.Usou medicamento
      // NÃO FOI ACHADO
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
      { nomeColuna: 'localDoContatoComSuspeitoOutro', nomeCampo: 'localDoContatoComSuspeitoOutro' },
      { nomeColuna: 'nomeSuspeito', nomeCampo: 'nomeSuspeito' },
      // 12. Outras informações'
      { nomeColuna: 'recebeuVacinaDaGripeNosUltimosDozeMeses', nomeCampo: 'recebeuVacinaDaGripeNosUltimosDozeMeses' },
      { nomeColuna: 'situacaoNoMomentoDaNotificacao', nomeCampo: 'situacaoNoMomentoDaNotificacao' },
    ];

    await geraExcel.gerarExcel(colunas, lista, res);
    return undefined;
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
};

this.retornarOutroTelefone = (notificacao) => {
  if (!notificacao) {
    return null;
  }

  if (!notificacao.Pessoa) {
    return null;
  }

  if (notificacao.Pessoa.telefoneContato && notificacao.Pessoa.telefoneCelular.length > 0) {
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

  if (!notificacao.Pessoa.Bairro) {
    return null;
  }

  if (!notificacao.Pessoa.Bairro.Municipio) {
    return null;
  }

  return notificacao.Pessoa.Bairro.Municipio.nome;
};

exports.retornarUFDoPaciente = (notificacao) => {
  if (!notificacao.Pessoa) {
    return null;
  }

  if (!notificacao.Pessoa.Bairro) {
    return null;
  }

  if (!notificacao.Pessoa.Bairro.Municipio) {
    return null;
  }

  return notificacao.Pessoa.Bairro.Municipio.uf;
};
