const notificacaoParaResponse = (notificacao, notificacaoCovid19, request) => {
  const { unidadeSaudeId, notificadorId, userId } = notificacao;
  const { dataHoraNotificacao, dataInicioDosSintomas, sintomatico } = notificacaoCovid19;
  return {
    id: notificacao.id,
    dataHoraNotificacao,
    unidadeSaudeId,
    notificadorId,
    sintomatico,
    dataInicioDosSintomas,
    userId,
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
  ocupacao,
  endereco,
  numero,
  telefoneResidencial,
  telefoneContato,
  telefoneCelular,
  Bairro,
}, bairro) => ({
  pessoaId: id,
  nome,
  dataDeNascimento,
  sexo,
  idade,
  bairroId,
  nomeDaMae,
  ocupacao,
  endereco,
  numero,
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
    isolamentoDomiciliar,
    leitoComum,
    leitoUti,
    prontoSocorroOuAtendimento,
    coletaMaterialParaDiagnostico,
    laboratorioOficial,
    laboratorioRedePrivada,
  } = notificacaoCovid19;
  return {
    isolamentoDomiciliar,
    leitoComum,
    leitoUti,
    prontoSocorroOuAtendimento,
    coletaMaterialParaDiagnostico,
    laboratorioOficial,
    laboratorioRedePrivada,
  };
};

module.exports = {
  notificacaoParaResponse,
  extrairSuspeito,
  extrairSintomas,
  extrairComorbidades,
  extrairInformacaoComplementar,
  extrairVinculoEpidemiologico,
  extrairConclusaoAtendimento,
};
