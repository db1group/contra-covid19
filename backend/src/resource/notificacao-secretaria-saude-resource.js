const secretariaApi = require('../services-api/secretaria-saude/service');
const repos = require('../repositories/repository-factory');
const tpTransmissaoApiSecretaria = require('../enums/tipo-transmissao-api-secretaria-enum');
const EnviarNotificacaoRequest = require('../services-api/secretaria-saude/models/enviar-notificacao-request');
const { RegraNegocioErro } = require('../lib/erros');
const apiErrors = require('../services-api/secretaria-saude/enums/api-errors');

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

exports.getPendentesEnvio = async (req, res, next) => {
    try {
        const notificacoes = await repos.notificacaoRepository
            .getNotificacoesPendentesEnvioSecretaria();

        const notificacoesPendentes = notificacoes.map((data) => {
            return {
                notificacaoId: data.Notificacao.id,
                nomePaciente: data.Notificacao.Pessoa.nome,
                dataHoraNotificacao: data.dataHoraNotificacao,
                nomeUnidadeSaude: data.Notificacao.UnidadeSaude.nome
            }
        });

        return res.json({ data: notificacoesPendentes });
    } catch (err) {
        return next(err);
    }
};

exports.enviarNotificacoes = async (req, res, next) => {
    try {
        const ids = req.body;
        const notificacoes = await repos.notificacaoRepository
            .getNotificacoesPendentesEnvioSecretariaPorIds(ids);

        let dataErrors = [];

        for (var i = 0; i < notificacoes.length; i += 1) {
            let notificacao = notificacoes[i];
            let request = new EnviarNotificacaoRequest(notificacao);
            let response;

            if (notificacao.NotificacaoCovid19.tpTransmissaoApiSecretaria === tpTransmissaoApiSecretaria.values.PendenteEnvio) {
                response = await secretariaApi.enviarNotificacao(request);
            } else {
                request.id = notificacao.NotificacaoCovid19.apiSecretariaId;
                response = await secretariaApi.atualizarNotificacao(request);
            }

            if (response.success === 'true') {
                await repos.notificacaoCovid19Repository.atualizarTpTransmissaoApiSecretaria(
                    notificacao.NotificacaoCovid19.id,
                    response.data.id,
                    tpTransmissaoApiSecretaria.values.Enviada);
            } else if (apiErrors.isFichaJaExiste(response.data)) {
                dataErrors.push(`A notificação do paciente ${notificacao.Pessoa.nome} já possui cadastro.`);
            } else {
                dataErrors.push(response.data);
            }
        }

        return res.json({ data: dataErrors });
    } catch (err) {
        return next(err);
    }
};