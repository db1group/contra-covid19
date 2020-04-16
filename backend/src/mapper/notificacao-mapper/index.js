const {
  requestParaModeloNotificacao,
  requestParaModeloNotificacaoHistorico,
} = require('./request-para-model');
const {
  notificacaoParaResponse,
  extrairSuspeito,
  extrairSintomas,
  extrairComorbidades,
  extrairInformacaoComplementar,
  extrairVinculoEpidemiologico,
  extrairConclusaoAtendimento,
} = require('./model-para-response');

module.exports = {
  mapearParaNotificacao: (request) => {
    const notificacao = requestParaModeloNotificacao(request);
    const notificacaoHistorico = requestParaModeloNotificacaoHistorico(request);
    return {
      ...notificacao,
      notificacaoHistorico: {
        ...notificacaoHistorico,
      },
    };
  },
  mapearParaResponse: (notificacao, notificacaoHistorico) => {
    let result = {};
    const suspeito = extrairSuspeito(notificacao);
    const sintomas = extrairSintomas(notificacaoHistorico);
    const comorbidades = extrairComorbidades(notificacaoHistorico);
    const informacaoComplementar = extrairInformacaoComplementar(notificacaoHistorico);
    const vinculoEpidemiologico = extrairVinculoEpidemiologico(notificacaoHistorico);
    const conclusaoAtendimento = extrairConclusaoAtendimento(notificacaoHistorico);
    result = notificacaoParaResponse(notificacao, notificacaoHistorico, result);
    result = {
      ...result,
      suspeito,
      sintomas,
      comorbidades,
      informacaoComplementar,
      vinculoEpidemiologico,
      conclusaoAtendimento,
      observacoes: notificacao.observacoes,
    };
    return result;
  },
};
