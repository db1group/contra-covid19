const {
  requestParaModeloNotificacao,
  requestParaModeloNotificacaoCovid19,
} = require('./request-para-model');
const {
  notificacaoParaResponse,
  extrairSuspeito,
  extrairSintomas,
  extrairComorbidades,
  extrairInformacaoComplementar,
  extrairVinculoEpidemiologico,
  extrairConclusaoAtendimento,
  extrairExamesImagem,
} = require('./model-para-response');
const mapearParaConsulta = require('./consulta');

module.exports = {
  mapearParaNotificacao: (request) => {
    const notificacao = requestParaModeloNotificacao(request);
    const notificacaoCovid19 = requestParaModeloNotificacaoCovid19(request);
    return {
      ...notificacao,
      notificacaoCovid19: {
        ...notificacaoCovid19,
      },
    };
  },
  mapearParaResponse: (notificacao, notificacaoCovid19) => {
    let result = {};
    const suspeito = extrairSuspeito(notificacao);
    const sintomas = extrairSintomas(notificacaoCovid19);
    const comorbidades = extrairComorbidades(notificacaoCovid19);
    const informacaoComplementar = extrairInformacaoComplementar(notificacaoCovid19);
    const vinculoEpidemiologico = extrairVinculoEpidemiologico(notificacaoCovid19);
    const conclusaoAtendimento = extrairConclusaoAtendimento(notificacaoCovid19);
    const examesImagem = extrairExamesImagem(notificacaoCovid19);
    result = notificacaoParaResponse(notificacao, notificacaoCovid19, result);
    result = {
      ...result,
      suspeito,
      sintomas,
      comorbidades,
      examesImagem,
      informacaoComplementar,
      vinculoEpidemiologico,
      conclusaoAtendimento,
    };
    return result;
  },
  mapearParaConsulta,
};
