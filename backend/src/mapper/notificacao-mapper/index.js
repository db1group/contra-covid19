const {
  requestParaModeloNotificacao,
  requestParaModeloNotificacaoCovid19,
} = require('./request-para-model');
const NotificacaoResponseMapper = require('./model-para-response');
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
    const mapeador = new NotificacaoResponseMapper(notificacao, notificacaoCovid19);

    return mapeador.pegarResponse();
  },
  mapearParaConsulta,
};
