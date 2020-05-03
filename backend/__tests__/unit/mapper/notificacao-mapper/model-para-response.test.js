const { notificacaoParaResponse, extrairSuspeito, extrairSintomas, extrairComorbidades,
    extrairExamesImagem, extrairInformacaoComplementar, extrairVinculoEpidemiologico,
    extrairConclusaoAtendimento } = require('../../../../src/mapper/notificacao-mapper/model-para-response');
const { notificacaoMapeadoResponse, notificacaoModelo, suspeitoMapeadoResponse,
    sintomasMapeadoResponse, comorbidadesMapeadoResponse, examesImagemMapedoResponse,
    informacaoComplementarMapeadoResponse, vinculoEpidemiologicoMapeadoResponse,
    conclusaoAtendimentoMapeadoResponse } = require('./dadosResponse');


describe('Testar mapeamento de modelo para response', () => {

    it('deve mapear modelo para notificacao (cabeçalho)', () => {
        const notificacao = notificacaoParaResponse(notificacaoModelo, notificacaoModelo.NotificacaoCovid19);

        expect(notificacao).toEqual(notificacaoMapeadoResponse);
    });

    it('deve mapear profissaoId à partir da notificacao', async () => {
        const notificacao = notificacaoParaResponse(notificacaoModelo, notificacaoModelo.NotificacaoCovid19);

        expect(notificacao.profissaoId).toBe(notificacaoMapeadoResponse.profissaoId);
    });
});


describe('Mapeamento de suspeito', () => {
    it('deve mapear modelo para suspeito', async () => {
        const suspeito = extrairSuspeito(notificacaoModelo);

        expect(suspeito).toEqual(suspeitoMapeadoResponse);
    });

    //Precisa confirmar - Talvez deveria ser notificacao.Pessoa.[bairro].municipioId
    it('deve mapear municipioId à partir da notificacao.bairro.municipioId', async () => {
        const suspeito = extrairSuspeito(notificacaoModelo);

        expect(suspeito.municipioId).toBe(notificacaoModelo.Bairro.municipioId);
    });

    //Parece estar errado - Não deveria pegar o bairro da pessoa?
    it('deve mapear o nome do bairro à partir do bairro da notificacao', async () => {
        const suspeito = extrairSuspeito(notificacaoModelo);

        expect(suspeito.bairro).toBe(notificacaoModelo.Bairro.nome);
    });

    //Todas as info do bairro vem do modelo. Aqui vem da Pessoa.
    it('deve mapear bairro do suspeito à partir da pessoa', async () => {
        const suspeito = extrairSuspeito(notificacaoModelo);

        expect(suspeito.bairroId).toBe(notificacaoModelo.Pessoa.bairroId);
    });

    //Parece estar errado. Acho que deveria dar erro
    it('deve usar nome do Bairro da pessoa QUANDO notificacao não possuir essas informações', async () => {
        const notificacao = { ...notificacaoModelo };
        delete notificacao.Bairro;

        const suspeito = extrairSuspeito(notificacao);

        expect(suspeito.bairro).toEqual(notificacao.Pessoa.Bairro.nome);
    });

    it('deve mapear ocupacaoId do suspeito à partir de Notificacao.Pessoa.ocupacaoId', async () => {
        const suspeito = extrairSuspeito(notificacaoModelo);

        expect(suspeito.ocupacaoId).toBe(notificacaoModelo.Pessoa.ocupacaoId);
    });

    it('deve mapear pessoaId do suspeito à partir de Notificacao.Pessoa.Id', async () => {
        const suspeito = extrairSuspeito(notificacaoModelo);

        expect(suspeito.pessoaId).toEqual(notificacaoModelo.Pessoa.id);
    });

    //Parece estar errado - Deveria lançar um erro se a pessoa não estiver presente.
    it('deve montar o suspeito à partir da notificacao se modelo não tiver pessoa', async () => {
        const notificacao = { ...notificacaoModelo };
        delete notificacao.Pessoa;
        const suspeitoEsperado = {
            pessoaId: notificacao.pessoaId,
            bairroId: notificacao.bairroId,
            municipioId: notificacao.municipioId,
            profissaoId: notificacao.profissaoId,
            ocupacaoId: notificacao.ocupacaoId,
        };

        const suspeito = extrairSuspeito(notificacao);

        expect(suspeito).toEqual(suspeitoEsperado);
    });

    it('deve deixar dados de município em branco se não existir na Notificacao.Pessoa', async () => {
        const notificacao = { ...notificacaoModelo };
        notificacao.Pessoa.Municipio = undefined;

        const suspeito = extrairSuspeito(notificacao);

        expect(suspeito.municipio).toBe('');
        expect(suspeito.uf).toBe('PR')
    });
});

describe('Mapeamento sintomas', () => {

    it('deve mapear modelo para sintomas', async () => {
        const response = extrairSintomas(notificacaoModelo.NotificacaoCovid19);

        expect(response).toEqual(sintomasMapeadoResponse);
    });
});

describe('Mapeamento comorbidades', () => {
    it('deve mapear modelo para Comorbidades ', async () => {
        const response = extrairComorbidades(notificacaoModelo.NotificacaoCovid19);

        expect(response).toEqual(comorbidadesMapeadoResponse);
    });

});

describe('Mapeamento examesImagem', () => {

    it('deve mapear modelo para exames imagem', async () => {
        const response = extrairExamesImagem(notificacaoModelo.NotificacaoCovid19);

        expect(response).toEqual(examesImagemMapedoResponse);
    });
});

describe('Mapeamento Informacao Complementar', () => {

    it('deve mapear modelo para Informacao Complementar', async () => {
        const response = extrairInformacaoComplementar(notificacaoModelo.NotificacaoCovid19);

        expect(response).toEqual(informacaoComplementarMapeadoResponse);
    });
});

describe('Vinculo epidemiológico', () => {

    it('deve mapear modelo para Vinculo Epidemiologico', async () => {
        const response = extrairVinculoEpidemiologico(notificacaoModelo.NotificacaoCovid19);

        expect(response).toEqual(vinculoEpidemiologicoMapeadoResponse);
    });
});

describe('Mapeamento Conclusão atendimento', () => {

    it('deve mapear modelo para Conclusão Atendimento', async () => {
        const response = extrairConclusaoAtendimento(notificacaoModelo.NotificacaoCovid19);

        expect(response).toEqual(conclusaoAtendimentoMapeadoResponse)
    });

});
