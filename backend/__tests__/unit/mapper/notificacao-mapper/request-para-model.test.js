const { requestParaModeloNotificacao, requestParaModeloNotificacaoCovid19 } = require('../../../../src/mapper/notificacao-mapper/request-para-model');
const notificacaoRequestJSON = require('./notificacao-request.json');
const notificacaoModeloJSON = require('./notificacaoModelo');

describe('Transformar request de notificação para modelo', () => {
    it('deve transformar o request em Notificacao', async () => {
        const notificacao = { ...notificacaoRequestJSON };
        const notificacaoEsperada = {
            bairroId: notificacaoRequestJSON.suspeito.bairroId,
            municipioId: notificacaoRequestJSON.unidadeDeSaude.municipioId,
            nomeNotificador: notificacaoRequestJSON.nomeNotificador,
            notificadorId: notificacaoRequestJSON.notificadorId,
            pessoaId: notificacaoRequestJSON.suspeito.pessoaId,
            profissaoId: notificacaoRequestJSON.profissaoId,
            status: notificacaoRequestJSON.status,
            unidadeSaudeId: notificacaoRequestJSON.unidadeSaudeId,
            userId: notificacaoRequestJSON.userId,
        };

        const modeloNotificacao = requestParaModeloNotificacao(notificacao);

        expect(modeloNotificacao).toEqual(notificacaoEsperada);
    });

    it('deve transformar o request em notificacaoCovid19', async () => {
        const notificacao = { ...notificacaoRequestJSON };

        const notificacaoCovid19 = requestParaModeloNotificacaoCovid19(notificacao);

        expect(notificacaoCovid19).toEqual(notificacaoModeloJSON.notificacaoCovid19);
    })

});