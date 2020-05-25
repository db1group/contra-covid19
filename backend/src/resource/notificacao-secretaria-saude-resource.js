const secretariaApi = require('../services-api/secretaria-saude/service');
const repos = require('../repositories/repository-factory');
const EnviarNotificacaoRequest = require('../services-api/secretaria-saude/models/enviar-notificacao-request');
const { RegraNegocioErro } = require('../lib/erros');

exports.enviarNotificacao = async (req, res, next) => {
    try {
        const { id } = req.params;

        const notificacao = await repos.notificacaoRepository.getPorId(id);
        const request = new EnviarNotificacaoRequest(notificacao);
        const response = await secretariaApi.enviarNotificacao(request);

        if (response.statusCode !== 200) {
            throw new RegraNegocioErro(response.data);
        }

        return res.json({ data: response });
    } catch (err) {
        return next(err);
    }
}