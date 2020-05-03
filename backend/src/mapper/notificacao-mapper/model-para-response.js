
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
    return {
      ...notificacao,
      suspeito,
      sintomas,
      comorbidades,
      examesImagem,
      informacaoComplementar,
      vinculoEpidemiologico,
      conclusaoAtendimento,
    };
  }

  /** métodos privados */
  _notificacaoParaResponse() {
    const {
      nomeNotificador, unidadeSaudeId, notificadorId, userId, profissaoId,
      UnidadeSaude,
    } = this.notificacao;
    const {
      dataHoraNotificacao, dataInicioDosSintomas, sintomatico, realizouExameDeImagem,
      contatoComSuspeito, localDoContatoComSuspeito, nomeSuspeito, observacoes,
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
      observacoes,
    };
  }

  _extrairSuspeito() {
    const { Pessoa, Bairro } = this.notificacao;
    if (Pessoa) { return this._extrairSuspeitoDaPessoa(Pessoa, Bairro); }
    return this._extrairSuspeitoDaNotificacao(this.notificacao);
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
  }, bairro) {
    return {
      pessoaId: id,
      tipoDocumento,
      numeroDocumento,
      nome,
      dataDeNascimento,
      sexo,
      cep,
      bairroId,
      bairro: bairro ? bairro.nome : Bairro.nome,
      nomeDaMae,
      ocupacao,
      ocupacaoId,
      endereco,
      numero,
      complemento,
      municipioId: bairro ? bairro.municipioId : Bairro.id,
      municipio: Municipio ? Municipio.nome : '',
      telefoneResidencial,
      telefoneContato,
      telefoneCelular,
      racaCor,
      tipoClassificacaoPessoa,
      uf: Municipio ? Municipio.uf : 'PR',
      idade,
      gestante,
      tipoPeriodoGestacional,
    };
  }

  _extrairSuspeitoDaNotificacao({
    pessoaId, bairroId, municipioId, profissaoId, ocupacaoId,
  }) {
    return {
      pessoaId,
      bairroId,
      municipioId,
      profissaoId,
      ocupacaoId,
    };
  }

  _extrairSintomas() {
    const {
      febreAferidaReferida, temperaturaFebre, adinamiaFraqueza, artralgia, calafrios,
      conjuntivite, coriza, congestaoNasal, dificuldadeDeglutir, gangliosLinfaticos,
      irritabilidadeConfusao, manchasVermelhas, tosse, dorDeGarganta, mialgia, escarro,
      sibilo, batimentoAsasNasais, dispneia, taquipneia, saturacaoDeOximetriaDePulso,
      cianoseCentral, diminuicaoDePulsoPeriferico, hipotensao, diarreia, cefaleia,
      nauseaVomito, tiragemIntercostal, outrosSintomas,
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
      nomeMedicamento,
      historicoDeViagem,
      dataDaViagem,
      localDaViagem,
      recebeuVacinaDaGripeNosUltimosDozeMeses,
    } = this.notificacaoCovid19;
    return {
      tamiflu,
      hidroxicloroquina,
      nomeMedicamento,
      historicoDeViagem,
      dataDaViagem,
      localDaViagem,
      recebeuVacinaDaGripeNosUltimosDozeMeses,
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
    } = this.notificacaoCovid19;
    return {
      situacaoNoMomentoDaNotificacao,
      coletaMaterialParaDiagnostico,
      tipoLaboratorio,
      nomeLaboratorioEnvioMaterial,
      dataDaColeta,
      metodoDeExame,
    };
  }
}

module.exports = NotificacaoResponseMapper;
