const requestParaModeloNotificacao = (objetoRequest) => {
  const {
    unidadeSaudeId, notificadorId, userId, suspeito,
  } = objetoRequest;

  return {
    userId,
    unidadeSaudeId,
    notificadorId,
    pessoaId: suspeito.pessoaId,
    bairroId: suspeito.bairroId,
    profissaoId: suspeito.profissaoId,
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
  };
};

module.exports = { requestParaModeloNotificacao, requestParaModeloNotificacaoCovid19 };
