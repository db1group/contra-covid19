const RegraNegocioErro = require('../../lib/erros/RegraNegocioErro');

class NotificacaoResponseMapper {
  constructor(notificacao, notificacaoCovid19) {
    this.notificacao = { ...notificacao };
    this.notificacaoCovid19 = { ...notificacaoCovid19 };
  }

  pegarResponse() {
    const notificacao = this._notificacaoParaResponse();
    const suspeito = this._extrairSuspeito();
    const sintomas = this._extrairSintomas();
    const comorbidades = this._extrairComorbidades();
    const examesImagem = this._extrairExamesImagem();
    const informacaoComplementar = this._extrairInformacaoComplementar();
    const vinculoEpidemiologico = this._extrairVinculoEpidemiologico();
    const conclusaoAtendimento = this._extrairConclusaoAtendimento();
    const hospitalizacao = this._extrairHospitalizacao();
    const frequentouCnes = this._extrairFrequentouCnes();
    return {
      ...notificacao,
      suspeito,
      sintomas,
      comorbidades,
      examesImagem,
      informacaoComplementar,
      vinculoEpidemiologico,
      conclusaoAtendimento,
      hospitalizacao,
      frequentouCnes,
    };
  }

  /** métodos privados */
  _notificacaoParaResponse() {
    const {
      nomeNotificador, unidadeSaudeId, notificadorId, userId, profissaoId,
      UnidadeSaude, possuiFechamento = false,
    } = this.notificacao;
    const {
      dataHoraNotificacao, dataInicioDosSintomas, sintomatico, realizouExameDeImagem,
      contatoComSuspeito, localDoContatoComSuspeito, nomeSuspeito, observacoes, descricaoLocal,
    } = this.notificacaoCovid19;
    return {
      id: this.notificacao.id,
      dataHoraNotificacao,
      unidadeSaudeId,
      unidadeSaudeNome: UnidadeSaude.nome,
      notificadorId,
      sintomatico,
      realizouExamesImagem: realizouExameDeImagem,
      dataInicioDosSintomas,
      userId,
      nomeNotificador,
      profissaoId,
      tipoDeContatoComCaso: contatoComSuspeito,
      tipoDeLocalDoCaso: localDoContatoComSuspeito,
      nomeDoCaso: nomeSuspeito,
      descricaoLocal,
      observacoes,
      possuiFechamento,
    };
  }

  _extrairSuspeito() {
    const { Pessoa } = this.notificacao;
    if (!Pessoa) {
      throw new RegraNegocioErro(`Não foi encontrada a pessoa com o código ${this.notificacao.pessoaId}`);
    }
    if (!Pessoa.Bairro) {
      throw new RegraNegocioErro(`Não foi localizado o bairro com o código ${Pessoa.bairroId} da pessoa ${this.notificacao.pessoaId}`);
    }
    return this._extrairSuspeitoDaPessoa(Pessoa);
  }

  _extrairSuspeitoDaPessoa({
    id,
    tipoDocumento,
    numeroDocumento,
    nome,
    dataDeNascimento,
    sexo,
    idade,
    bairroId,
    nomeDaMae,
    ocupacaoId,
    ocupacao,
    endereco,
    numero,
    telefoneResidencial,
    telefoneContato,
    telefoneCelular,
    complemento,
    Bairro,
    gestante,
    tipoPeriodoGestacional,
    racaCor,
    Municipio,
    cep,
    tipoClassificacaoPessoa,
    passaporte,
    paisId,
    Pais,
    gestanteAltoRisco,
  }) {
    return {
      pessoaId: id,
      tipoDocumento,
      numeroDocumento,
      nome,
      dataDeNascimento,
      sexo,
      cep,
      bairroId,
      bairro: Bairro.nome,
      nomeDaMae,
      ocupacao,
      ocupacaoId,
      endereco,
      numero,
      complemento,
      municipioId: Bairro.municipioId,
      municipio: Municipio ? Municipio.nome : '',
      telefoneResidencial,
      telefoneContato,
      telefoneCelular,
      racaCor,
      tipoClassificacaoPessoa,
      uf: Municipio ? Municipio.uf : 'PR',
      idade,
      gestante,
      gestanteAltoRisco,
      tipoPeriodoGestacional,
      passaporte,
      paisId,
      pais: Pais ? Pais.nome : 'Brasil',
    };
  }

  _extrairSintomas() {
    const {
      febreAferidaReferida, temperaturaFebre, adinamiaFraqueza, artralgia, calafrios,
      conjuntivite, coriza, congestaoNasal, dificuldadeDeglutir, gangliosLinfaticos,
      irritabilidadeConfusao, manchasVermelhas, tosse, dorDeGarganta, mialgia, escarro,
      sibilo, batimentoAsasNasais, dispneia, taquipneia, saturacaoDeOximetriaDePulso,
      cianoseCentral, diminuicaoDePulsoPeriferico, hipotensao, diarreia, cefaleia,
      nauseaVomito, tiragemIntercostal, outrosSintomas, perdaOlfatoPaladar,
    } = this.notificacaoCovid19;
    return {
      febreAferidaReferida,
      temperaturaFebre,
      adinamiaFraqueza,
      artralgia,
      calafrios,
      conjuntivite,
      coriza,
      congestaoNasal,
      dificuldadeDeglutir,
      gangliosLinfaticos,
      irritabilidadeOuConfusao: irritabilidadeConfusao,
      manchasVermelhas,
      tosse,
      dorDeGarganta,
      mialgia,
      escarro,
      sibilo,
      batimentoAsasNasais,
      dispneia,
      taquipneia,
      saturacaoDeOximetriaDePulso,
      cianoseCentral,
      diminuicaoDePulsoPeriferico,
      hipotensao,
      diarreia,
      cefaleia,
      nauseaVomito,
      tiragemIntercostal,
      perdaOlfatoPaladar,
      outros: outrosSintomas,
    };
  }

  _extrairComorbidades() {
    const {
      puerperaAte45DiasDoParto,
      sindromeDeDown,
      diabetesMellitus,
      imunodeficiencia,
      doencaCardioVascularCronica,
      doencaHepaticaCronica,
      doencaNeurologicaCronica,
      doencaRenalCronica,
      doencaHematologicaCronica,
      asma,
      outraPneumopatiaCronica,
      obesidade,
      hipertensao,
      infeccaoHIV,
      neoplasia,
      tabagismo,
      doencaPulmonar,
      outrosComorbidades,
    } = this.notificacaoCovid19;
    return {
      puerperaAte45DiasDoParto,
      sindromeDeDown,
      diabetesMellitus,
      imunodeficiencia,
      doencaCardioVascularCronica,
      doencaHepaticaCronica,
      doencaNeurologicaCronica,
      doencaRenalCronica,
      doencaHematologicaCronica,
      asma,
      outraPneumopatiaCronica,
      obesidade,
      hipertensao,
      infeccaoHIV,
      neoplasia,
      tabagismo,
      doencaPulmonar,
      outros: outrosComorbidades,
    };
  }

  _extrairExamesImagem() {
    const {
      raioXNormal, raioXInfiltrado, raioXConsolidacao, raioXMisto, raioXOutro,
      tomografiaNormal, tomografiaVitro, tomografiaDerrame, tomografiaLinfonodo,
      tomografiaOutro,
    } = this.notificacaoCovid19;
    return {
      raioNormal: raioXNormal,
      raioInfiltradoIntersticial: raioXInfiltrado,
      raioConsolidacao: raioXConsolidacao,
      raioMisto: raioXMisto,
      raioOutro: raioXOutro,
      tomografiaNormal,
      tomografiaVidroFoscoPredominioPerifericoBasal: tomografiaVitro,
      tomografiaAusenciaDerramePleural: tomografiaDerrame,
      tomografiaAusenciaLinfonodoMediastenal: tomografiaLinfonodo,
      tomografiaOutro,
    };
  }

  _extrairInformacaoComplementar() {
    const {
      tamiflu,
      hidroxicloroquina,
      cloroquina,
      nomeMedicamento,
      historicoDeViagem,
      dataDaViagem,
      localDaViagem,
      recebeuVacinaDaGripeNosUltimosDozeMeses,
      dataRetornoLocal,
      dataChegadaBrasil,
      dataChegadaUF,
      descritivoViagem,
    } = this.notificacaoCovid19;
    return {
      tamiflu,
      hidroxicloroquina,
      cloroquina,
      nomeMedicamento,
      historicoDeViagem,
      dataDaViagem,
      localDaViagem,
      recebeuVacinaDaGripeNosUltimosDozeMeses,
      dataRetornoLocal,
      dataChegadaBrasil,
      dataChegadaUF,
      descritivoViagem,
    };
  }

  _extrairVinculoEpidemiologico() {
    const { situacao1, situacao2, nomeTeveContato } = this.notificacaoCovid19;
    return {
      situacao1,
      situacao2,
      nome: nomeTeveContato,
    };
  }

  _extrairConclusaoAtendimento() {
    const {
      coletaMaterialParaDiagnostico,
      tipoLaboratorio,
      nomeLaboratorioEnvioMaterial,
      situacaoNoMomentoDaNotificacao,
      dataDaColeta,
      metodoDeExame,
      dataCadastroExame,
      dataRecebimentoExame,
      dataLiberacaoExame,
      codigoExame,
      requisicao,
      exameId,
      nomeExame,
      resultadoExameId,
      nomeResultado,
      labAmostraId,
      nomeLabAmostra,
      pesquisaGal,
      numeroDo,
    } = this.notificacaoCovid19;
    return {
      situacaoNoMomentoDaNotificacao,
      coletaMaterialParaDiagnostico,
      tipoLaboratorio,
      nomeLaboratorioEnvioMaterial,
      dataDaColeta,
      metodoDeExame,
      dataCadastroExame,
      dataRecebimentoExame,
      dataLiberacaoExame,
      codigoExame,
      requisicao,
      exameId,
      nomeExame,
      resultadoExameId,
      nomeResultado,
      labAmostraId,
      nomeLabAmostra,
      pesquisaGal,
      numeroDo,
    };
  }

  _extrairHospitalizacao() {
    const {
      hospitalizado,
      cnesHospitalId,
      internacaoSus,
      tipoLeito,
      dataInternamento,
      dataIsolamento,
      dataAlta,
      Hospital = {},
    } = this.notificacaoCovid19;
    const { nome = '' } = Hospital || {};
    return {
      hospitalizado,
      cnesHospitalId,
      nomeHospital: nome,
      internacaoSus,
      tipoLeito,
      dataInternamento,
      dataIsolamento,
      dataAlta,
    };
  }

  _extrairFrequentouCnes() {
    const {
      frequentouUnidade,
      unidadeFrequentadaId,
      UnidadeFrequentada = {},
    } = this.notificacaoCovid19;
    const { nome = '' } = UnidadeFrequentada || {};
    return {
      frequentouUnidade,
      unidadeFrequentadaId,
      nomeFrequentada: nome,
    };
  }
}

module.exports = NotificacaoResponseMapper;
