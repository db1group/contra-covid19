const enviarNotificacaoSecretariaSaudeService = require('../services/enviar-notificacao-secretaria-saude-service');

exports.enviarNotificacao = async (req, res, next) => {
    try {
        const { id } = req.params;

        const notificacao = await repos.notificacaoRepository.getPorId(id);
        
        await enviarNotificacaoSecretariaSaudeService.handle(id);
        return res.json();
    } catch (err) {
        return next(err);
    }
}