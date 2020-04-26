const requestParaModeloNotificacao = (objetoRequest) => {
  const {
    unidadeSaudeId, notificadorId, userId, profissaoId, suspeito,
    nomeNotificador, status, unidadeDeSaude,
  } = objetoRequest;

  return {
    userId,
    unidadeSaudeId,
    notificadorId,
    municipioId: unidadeDeSaude.municipioId,
    pessoaId: suspeito.pessoaId,
    bairroId: suspeito.bairroId,
    profissaoId,
    nomeNotificador,
    status,
  };
};

const mapearSintomas = (sintomas) => {
  const { outros, ...sintomasAferidos } = sintomas;
  return {
    ...sintomasAferidos,
    outrosSintomas: outros,
  };
};

const mapearComorbidades = (comorbidades) => {
  const { outros, ...comorbidadesAferidas } = comorbidades;
  return {
    ...comorbidadesAferidas,
    outrosComorbidades: outros,
  };
};

const mapearVinculoEpidemiologico = (vinculoEpidemiologico) => {
  const { nome, ...vinculoAferido } = vinculoEpidemiologico;
  return {
    ...vinculoAferido,
    nomeTeveContato: nome,
  };
};

const requestParaModeloNotificacaoCovid19 = (objetoRequest) => {
  const {
    sintomas, comorbidades, informacaoComplementar,
    vinculoEpidemiologico, conclusaoAtendimento,
    tipoDeContatoComCaso, tipoDeLocalDoCaso,
    nomeDoCaso, realizouExamesImagem,
  } = objetoRequest;

  const sintomasAferidos = mapearSintomas(sintomas);
  const comorbidadesAferidas = mapearComorbidades(comorbidades);
  const vinculoEpidemiologicoAferido = mapearVinculoEpidemiologico(vinculoEpidemiologico);

  return {
    sintomatico: !!sintomas,
    dataInicioDosSintomas: objetoRequest.dataInicioDosSintomas,
    dataHoraNotificacao: objetoRequest.dataHoraNotificacao,
    ...sintomasAferidos,
    ...comorbidadesAferidas,
    ...informacaoComplementar,
    ...vinculoEpidemiologicoAferido,
    ...conclusaoAtendimento,
    observacoes: objetoRequest.observacoes,
    contatoComSuspeito: tipoDeContatoComCaso,
    localDoContatoComSuspeito: tipoDeLocalDoCaso,
    nomeSuspeito: nomeDoCaso,
    realizouExameDeImagem: realizouExamesImagem,
  };
};

module.exports = { requestParaModeloNotificacao, requestParaModeloNotificacaoCovid19 };
