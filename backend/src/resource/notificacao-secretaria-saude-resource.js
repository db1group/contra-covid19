const enviarNotificacaoSecretariaSaudeService = require('../services/enviar-notificacao-secretaria-saude-service');


exports.enviarNotificacao = async (req, res, next) => {
    try {
        const { id } = req.params;
        await enviarNotificacaoSecretariaSaudeService.handle();
        // return res.json();
    } catch (err) {
        return next(err);
    }
}