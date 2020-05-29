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
  mapearParaResponse: (notificacao, notificacaoCovid19, possuiFechamento = false) => {
    let notificacaoDataValues = { ...notificacao, possuiFechamento };
    let notificacaoCovid19DataValues = { ...notificacaoCovid19 };
    if (notificacao.dataValues) {
      notificacaoDataValues = { ...notificacao.dataValues, possuiFechamento };
    }
    if (notificacaoCovid19.dataValues) {
      notificacaoCovid19DataValues = { ...notificacaoCovid19.dataValues };
    }

    const mapeador = new NotificacaoResponseMapper(notificacaoDataValues,
      notificacaoCovid19DataValues);

    return mapeador.pegarResponse();
  },
  mapearParaConsulta,
};
