const secretariaSaudeApi = require('../services-api/secretaria-saude/service');
const EnviarNotificacaoRequest = require('../services-api/secretaria-saude/models/enviar-notificacao-request');

exports.handle = async (notificacao) => {
    const request = new EnviarNotificacaoRequest(notificacao);
    const response = secretariaSaudeApi.enviarNotificacao(request);
    return response;
}