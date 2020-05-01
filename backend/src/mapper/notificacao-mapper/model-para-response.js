const notificacaoParaResponse = (notificacao, notificacaoCovid19, request) => {
  const {
    nomeNotificador, unidadeSaudeId, notificadorId, userId, profissaoId, UnidadeSaude,
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
    ...request,
  };
};

const extrairSuspeitoDaNotificacao = ({
  pessoaId, bairroId, municipioId, profissaoId, ocupacaoId,
}) => ({
  pessoaId,
  bairroId,
  municipioId,
  profissaoId,
  ocupacaoId,
});

const extrairSuspeitoDaPessoa = ({
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
}, bairro) => ({
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
});

const extrairSuspeito = (notificacao) => {
  const { Pessoa, Bairro } = notificacao;
  if (Pessoa) { return extrairSuspeitoDaPessoa(Pessoa, Bairro); }
  return extrairSuspeitoDaNotificacao(notificacao);
};

const extrairSintomas = (notificacaoCovid19) => {
  const {
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
    irritabilidadeConfusao,
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
    outrosSintomas,
  } = notificacaoCovid19;
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
    hipertensao,
    infeccaoHIV,
    neoplasia,
    tabagismo,
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
    hipertensao,
    infeccaoHIV,
    neoplasia,
    tabagismo,
    outros: outrosComorbidades,
  };
};

const extrairInformacaoComplementar = (notificacaoCovid19) => {
  const {
    tamiflu,
    hidroxicloroquina,
    nomeMedicamento,
    historicoDeViagem,
    dataDaViagem,
    localDaViagem,
    recebeuVacinaDaGripeNosUltimosDozeMeses,
  } = notificacaoCovid19;
  return {
    tamiflu,
    hidroxicloroquina,
    nomeMedicamento,
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
  extrairExamesImagem,
  extrairInformacaoComplementar,
  extrairVinculoEpidemiologico,
  extrairConclusaoAtendimento,
};
