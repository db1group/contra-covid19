const NotificacaoResponseMapper = require('../../../../src/mapper/notificacao-mapper/model-para-response');
const { notificacaoMapeadoResponse, notificacaoModelo, suspeitoMapeadoResponse,
    sintomasMapeadoResponse, comorbidadesMapeadoResponse, examesImagemMapedoResponse,
    informacaoComplementarMapeadoResponse, vinculoEpidemiologicoMapeadoResponse,
    conclusaoAtendimentoMapeadoResponse } = require('./dadosResponse');


describe('Testar mapeamento de modelo para response', () => {

    it('deve mapear modelo para notificacao (cabeçalho)', () => {
        const mapeador = new NotificacaoResponseMapper(notificacaoModelo, notificacaoModelo.NotificacaoCovid19);

        const notificacao = mapeador._notificacaoParaResponse();

        expect(notificacao).toEqual(notificacaoMapeadoResponse);
    });

    it('deve mapear profissaoId à partir da notificacao', async () => {
        const mapeador = new NotificacaoResponseMapper(notificacaoModelo, notificacaoModelo.NotificacaoCovid19);

        const notificacao = mapeador._notificacaoParaResponse();

        expect(notificacao.profissaoId).toBe(notificacaoMapeadoResponse.profissaoId);
    });
});


describe('Mapeamento de suspeito', () => {
    it('deve mapear modelo para suspeito', async () => {
        const mapeador = new NotificacaoResponseMapper(notificacaoModelo, notificacaoModelo.NotificacaoCovid19);

        const suspeito = mapeador._extrairSuspeito();

        expect(suspeito).toEqual(suspeitoMapeadoResponse);
    });

    //Precisa confirmar - Talvez deveria ser notificacao.Pessoa.[bairro].municipioId
    it('deve mapear municipioId à partir da notificacao.bairro.municipioId', async () => {
        const mapeador = new NotificacaoResponseMapper(notificacaoModelo, notificacaoModelo.NotificacaoCovid19);

        const suspeito = mapeador._extrairSuspeito();

        expect(suspeito.municipioId).toBe(notificacaoModelo.Bairro.municipioId);
    });

    //Parece estar errado - Não deveria pegar o bairro da pessoa?
    it('deve mapear o nome do bairro à partir do bairro da notificacao', async () => {
        const mapeador = new NotificacaoResponseMapper(notificacaoModelo, notificacaoModelo.NotificacaoCovid19);

        const suspeito = mapeador._extrairSuspeito();

        expect(suspeito.bairro).toBe(notificacaoModelo.Bairro.nome);
    });

    //Todas as info do bairro vem do modelo. Aqui vem da Pessoa.
    it('deve mapear bairro do suspeito à partir da pessoa', async () => {
        const mapeador = new NotificacaoResponseMapper(notificacaoModelo, notificacaoModelo.NotificacaoCovid19);

        const suspeito = mapeador._extrairSuspeito(notificacaoModelo);

        expect(suspeito.bairroId).toBe(notificacaoModelo.Pessoa.bairroId);
    });

    //Parece estar errado. Acho que deveria dar erro
    it('deve usar nome do Bairro da pessoa QUANDO notificacao não possuir essas informações', async () => {
        const notificacao = { ...notificacaoModelo };
        delete notificacao.Bairro;
        const mapeador = new NotificacaoResponseMapper(notificacao, notificacao.NotificacaoCovid19);



        const suspeito = mapeador._extrairSuspeito(notificacao);

        expect(suspeito.bairro).toEqual(notificacao.Pessoa.Bairro.nome);
    });

    it('deve mapear ocupacaoId do suspeito à partir de Notificacao.Pessoa.ocupacaoId', async () => {
        const mapeador = new NotificacaoResponseMapper(notificacaoModelo, notificacaoModelo.NotificacaoCovid19);

        const suspeito = mapeador._extrairSuspeito(notificacaoModelo);

        expect(suspeito.ocupacaoId).toBe(notificacaoModelo.Pessoa.ocupacaoId);
    });

    it('deve mapear pessoaId do suspeito à partir de Notificacao.Pessoa.Id', async () => {
        const mapeador = new NotificacaoResponseMapper(notificacaoModelo, notificacaoModelo.NotificacaoCovid19);

        const suspeito = mapeador._extrairSuspeito(notificacaoModelo);

        expect(suspeito.pessoaId).toEqual(notificacaoModelo.Pessoa.id);
    });

    //Parece estar errado - Deveria lançar um erro se a pessoa não estiver presente.
    it('deve montar o suspeito à partir da notificacao se modelo não tiver pessoa', async () => {
        const notificacao = { ...notificacaoModelo };
        delete notificacao.Pessoa;
        const mapeador = new NotificacaoResponseMapper(notificacao, notificacao.NotificacaoCovid19);
        const suspeitoEsperado = {
            pessoaId: notificacao.pessoaId,
            bairroId: notificacao.bairroId,
            municipioId: notificacao.municipioId,
            profissaoId: notificacao.profissaoId,
            ocupacaoId: notificacao.ocupacaoId,
        };

        const suspeito = mapeador._extrairSuspeito(notificacao);

        expect(suspeito).toEqual(suspeitoEsperado);
    });

    it('deve deixar dados de município em branco se não existir na Notificacao.Pessoa', async () => {
        const mapeador = new NotificacaoResponseMapper(notificacaoModelo, notificacaoModelo.NotificacaoCovid19);

        const notificacao = { ...notificacaoModelo };
        notificacao.Pessoa.Municipio = undefined;

        const suspeito = mapeador._extrairSuspeito(notificacao);

        expect(suspeito.municipio).toBe('');
        expect(suspeito.uf).toBe('PR')
    });
});

describe('Mapeamento sintomas', () => {

    it('deve mapear modelo para sintomas', async () => {
        const mapeador = new NotificacaoResponseMapper(notificacaoModelo, notificacaoModelo.NotificacaoCovid19);

        const response = mapeador._extrairSintomas(notificacaoModelo.NotificacaoCovid19);

        expect(response).toEqual(sintomasMapeadoResponse);
    });
});

describe('Mapeamento comorbidades', () => {
    it('deve mapear modelo para Comorbidades ', async () => {
        const mapeador = new NotificacaoResponseMapper(notificacaoModelo, notificacaoModelo.NotificacaoCovid19);

        const response = mapeador._extrairComorbidades(notificacaoModelo.NotificacaoCovid19);

        expect(response).toEqual(comorbidadesMapeadoResponse);
    });

});

describe('Mapeamento examesImagem', () => {

    it('deve mapear modelo para exames imagem', async () => {
        const mapeador = new NotificacaoResponseMapper(notificacaoModelo, notificacaoModelo.NotificacaoCovid19);

        const response = mapeador._extrairExamesImagem(notificacaoModelo.NotificacaoCovid19);

        expect(response).toEqual(examesImagemMapedoResponse);
    });
});

describe('Mapeamento Informacao Complementar', () => {

    it('deve mapear modelo para Informacao Complementar', async () => {
        const mapeador = new NotificacaoResponseMapper(notificacaoModelo, notificacaoModelo.NotificacaoCovid19);

        const response = mapeador._extrairInformacaoComplementar(notificacaoModelo.NotificacaoCovid19);

        expect(response).toEqual(informacaoComplementarMapeadoResponse);
    });
});

describe('Vinculo epidemiológico', () => {

    it('deve mapear modelo para Vinculo Epidemiologico', async () => {
        const mapeador = new NotificacaoResponseMapper(notificacaoModelo, notificacaoModelo.NotificacaoCovid19);

        const response = mapeador._extrairVinculoEpidemiologico(notificacaoModelo.NotificacaoCovid19);

        expect(response).toEqual(vinculoEpidemiologicoMapeadoResponse);
    });
});

describe('Mapeamento Conclusão atendimento', () => {

    it('deve mapear modelo para Conclusão Atendimento', async () => {
        const mapeador = new NotificacaoResponseMapper(notificacaoModelo, notificacaoModelo.NotificacaoCovid19);

        const response = mapeador._extrairConclusaoAtendimento(notificacaoModelo.NotificacaoCovid19);

        expect(response).toEqual(conclusaoAtendimentoMapeadoResponse)
    });

});
