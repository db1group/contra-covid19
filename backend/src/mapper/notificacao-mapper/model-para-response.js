const notificacaoParaResponse = (notificacao, notificacaoCovid19, request) => {
  const {
    nomeNotificador, unidadeSaudeId, notificadorId, userId, profissaoId,
  } = notificacao;
  const {
    dataHoraNotificacao, dataInicioDosSintomas, sintomatico,
    realizouExameDeImagem, contatoComSuspeito, localDoContatoComSuspeito, nomeSuspeito,
    observacoes,
  } = notificacaoCovid19;
  return {
    id: notificacao.id,
    dataHoraNotificacao,
    unidadeSaudeId,
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
    ...request,
  };
};

const extrairSuspeitoDaNotificacao = ({
  pessoaId, bairroId, municipioId, profissaoId,
}) => ({
  pessoaId,
  bairroId,
  municipioId,
  profissaoId,
});

const extrairSuspeitoDaPessoa = ({
  id,
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
}, bairro) => ({
  pessoaId: id,
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
  complemento,
  bairro: bairro ? bairro.nome : Bairro.nome,
  municipioId: bairro ? bairro.municipioId : Bairro.id,
  telefoneResidencial,
  telefoneContato,
  telefoneCelular,
});

const extrairSuspeito = (notificacao) => {
  const { Pessoa, Bairro } = notificacao;
  if (Pessoa) { return extrairSuspeitoDaPessoa(Pessoa, Bairro); }
  return extrairSuspeitoDaNotificacao(notificacao);
};

const extrairSintomas = (notificacaoCovid19) => {
  const {
    coriza,
    tosseSeca,
    dorDeGarganta,
    mialgia,
    tosseProdutiva,
    sibilo,
    desconfortoRespiratorio,
    dispneia,
    taquipneia,
    saturacaoDeOximetriaDePulso,
    cianoseCentral,
    diminuicaoDePulsoPeriferico,
    hipotensao,
    diarreia,
    cefaleia,
    nausea,
    vomito,
    outrosSintomas,
  } = notificacaoCovid19;
  return {
    coriza,
    tosseSeca,
    dorDeGarganta,
    mialgia,
    tosseProdutiva,
    sibilo,
    desconfortoRespiratorio,
    dispneia,
    taquipneia,
    saturacaoDeOximetriaDePulso,
    cianoseCentral,
    diminuicaoDePulsoPeriferico,
    hipotensao,
    diarreia,
    cefaleia,
    nausea,
    vomito,
    outros: outrosSintomas,
  };
};

const extrairComorbidades = (notificacaoCovid19) => {
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
    outrosComorbidades,
  } = notificacaoCovid19;
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
    outros: outrosComorbidades,
  };
};

const extrairInformacaoComplementar = (notificacaoCovid19) => {
  const {
    medicacaoAntitermica,
    nomeMedicacaoAntitermica,
    medicacaoAnalgesica,
    nomeMedicacaoAnalgesica,
    medicacaoAntiflamatorio,
    nomeMedicacaoAntiflamatorio,
    medicacaoAntiviral,
    nomeMedicacaoAntiviral,
    historicoDeViagem,
    dataDaViagem,
    localDaViagem,
    recebeuVacinaDaGripeNosUltimosDozeMeses,
  } = notificacaoCovid19;
  return {
    medicacaoAntitermica,
    nomeMedicacaoAntitermica,
    medicacaoAnalgesica,
    nomeMedicacaoAnalgesica,
    medicacaoAntiflamatorio,
    nomeMedicacaoAntiflamatorio,
    medicacaoAntiviral,
    nomeMedicacaoAntiviral,
    historicoDeViagem,
    dataDaViagem,
    localDaViagem,
    recebeuVacinaDaGripeNosUltimosDozeMeses,
  };
};

const extrairVinculoEpidemiologico = (notificacaoCovid19) => {
  const {
    situacao1,
    situacao2,
    nomeTeveContato,
  } = notificacaoCovid19;
  return {
    situacao1,
    situacao2,
    nome: nomeTeveContato,
  };
};

const extrairConclusaoAtendimento = (notificacaoCovid19) => {
  const {
    coletaMaterialParaDiagnostico,
    tipoLaboratorio,
    nomeLaboratorioEnvioMaterial,
    situacaoNoMomentoDaNotificacao,
    dataDaColeta,
    metodoDeExame,
  } = notificacaoCovid19;
  return {
    situacaoNoMomentoDaNotificacao,
    coletaMaterialParaDiagnostico,
    tipoLaboratorio,
    nomeLaboratorioEnvioMaterial,
    dataDaColeta,
    metodoDeExame,
  };
};

const extrairExamesImagem = ({
  raioXNormal,
  raioXInfiltrado,
  raioXConsolidacao,
  raioXMisto,
  raioXOutro,
  tomografiaNormal,
  tomografiaVitro,
  tomografiaDerrame,
  tomografiaLinfonodo,
  tomografiaOutro,
}) => ({
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
});

module.exports = {
  notificacaoParaResponse,
  extrairSuspeito,
  extrairSintomas,
  extrairComorbidades,
  extrairInformacaoComplementar,
  extrairVinculoEpidemiologico,
  extrairConclusaoAtendimento,
  extrairExamesImagem,
};
