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
    profissaoId,
    nomeNotificador,
    status,
  };
};

const mapearSintomas = (sintomas) => {
  const {
    outros, adinamiaFraqueza, irritabilidadeOuConfusao, manchasVermelhas, ...sintomasAferidos
  } = sintomas;
  return {
    ...sintomasAferidos,
    adinamiaFraqueza,
    irritabilidadeConfusao: irritabilidadeOuConfusao,
    manchasVermelhas,
    outrosSintomas: outros,
  };
};

const mapearComorbidades = (comorbidades) => {
  const {
    outros, ...comorbidadesAferidas
  } = comorbidades;
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

const mapearExamesImage = ({
  raioNormal,
  raioInfiltradoIntersticial,
  raioConsolidacao,
  raioMisto,
  raioOutro,
  tomografiaNormal,
  tomografiaVidroFoscoPredominioPerifericoBasal,
  tomografiaAusenciaDerramePleural,
  tomografiaAusenciaLinfonodoMediastenal,
  tomografiaOutro,
}) => ({
  raioXNormal: raioNormal,
  raioXInfiltrado: raioInfiltradoIntersticial,
  raioXConsolidacao: raioConsolidacao,
  raioXMisto: raioMisto,
  raioXOutro: raioOutro,
  tomografiaNormal,
  tomografiaVitro: tomografiaVidroFoscoPredominioPerifericoBasal,
  tomografiaDerrame: tomografiaAusenciaDerramePleural,
  tomografiaLinfonodo: tomografiaAusenciaLinfonodoMediastenal,
  tomografiaOutro,
});

const requestParaModeloNotificacaoCovid19 = (objetoRequest) => {
  const {
    sintomas, comorbidades, informacaoComplementar,
    vinculoEpidemiologico, conclusaoAtendimento, examesImagem,
    tipoDeContatoComCaso, tipoDeLocalDoCaso,
    nomeDoCaso, realizouExamesImagem, sintomatico, descricaoLocal,
    hospitalizacao,
  } = objetoRequest;

  const sintomasAferidos = mapearSintomas(sintomas);
  const comorbidadesAferidas = mapearComorbidades(comorbidades);
  const vinculoEpidemiologicoAferido = mapearVinculoEpidemiologico(vinculoEpidemiologico);
  const exameImagemAferido = mapearExamesImage({ ...examesImagem });

  return {
    sintomatico,
    dataInicioDosSintomas: objetoRequest.dataInicioDosSintomas,
    dataHoraNotificacao: objetoRequest.dataHoraNotificacao,
    ...sintomasAferidos,
    ...comorbidadesAferidas,
    ...informacaoComplementar,
    ...vinculoEpidemiologicoAferido,
    ...conclusaoAtendimento,
    ...exameImagemAferido,
    observacoes: objetoRequest.observacoes,
    contatoComSuspeito: tipoDeContatoComCaso,
    localDoContatoComSuspeito: tipoDeLocalDoCaso,
    nomeSuspeito: nomeDoCaso,
    realizouExameDeImagem: realizouExamesImagem,
    descricaoLocal,
    ...hospitalizacao,
  };
};

module.exports = { requestParaModeloNotificacao, requestParaModeloNotificacaoCovid19 };
