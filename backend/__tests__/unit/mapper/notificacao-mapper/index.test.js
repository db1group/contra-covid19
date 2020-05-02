const notificacaoRequestJSON = require('./notificacao-request.json');
const notificacaoModeloJSON = require('./notificacaoModelo');
const { mapearParaNotificacao } = require('../../../../src/mapper/notificacao-mapper');


describe('Testando mapeamento de notificacao', () => {
    it('Deve transformar um request consolidado em Notificacao', async () => {
        const notificacao = { ...notificacaoRequestJSON };

        const modeloNotificacao = mapearParaNotificacao(notificacao);

        expect(modeloNotificacao).toEqual(notificacaoModeloJSON);
    });

    it('Deve transformar um request consolidado em NotificacaoCovid19', async () => {
        const notificacao = { ...notificacaoRequestJSON };

        const notificacaoModelo = mapearParaNotificacao(notificacao);

        expect(notificacaoModelo.notificacaoCovid19).toEqual(notificacaoModeloJSON.notificacaoCovid19);
    });

    it('Deve buscar pessoa id informado', async () => {
        const { suspeito: { pessoaId: pessoaIdEsperado } } = notificacaoRequestJSON;
        const { pessoaId } = mapearParaNotificacao(notificacaoRequestJSON);
        expect(pessoaId).toBe(pessoaIdEsperado);
    });

    it('Deve informar pessoaId: null se não existente', async () => {
        const { suspeito: { pessoaId, ...suspeitoSemPessoa } } = notificacaoRequestJSON;
        const requestSemPessoa = {
            ...notificacaoRequestJSON,
            suspeito: suspeitoSemPessoa
        };
        const response = mapearParaNotificacao(requestSemPessoa);
        expect(response.pessoaId).toBe(undefined);
    });
});