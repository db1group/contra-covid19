const { notificacaoModeloMapeado, notificacaoRequest } = require('./dadosRequest');
const { mapearParaNotificacao, mapearParaResponse } = require('../../../../src/mapper/notificacao-mapper');

const {
  notificacaoModelo, notificacaoMapeadoResponse, suspeitoMapeadoResponse,
  sintomasMapeadoResponse, comorbidadesMapeadoResponse, examesImagemMapedoResponse,
  informacaoComplementarMapeadoResponse, vinculoEpidemiologicoMapeadoResponse,
  conclusaoAtendimentoMapeadoResponse,
} = require('./dadosResponse');


describe('Testando mapeamento de notificacao', () => {
  it('Deve transformar um request consolidado em Notificacao', async () => {
    const notificacao = { ...notificacaoRequest };

    const modeloNotificacao = mapearParaNotificacao(notificacao);

    expect(modeloNotificacao).toEqual(notificacaoModeloMapeado);
  });

  it('Deve transformar um request consolidado em NotificacaoCovid19', async () => {
    const notificacao = { ...notificacaoRequest };

    const modeloMapeado = mapearParaNotificacao(notificacao);

    expect(modeloMapeado.notificacaoCovid19).toEqual(modeloMapeado.notificacaoCovid19);
  });
});

describe('Testar mapeamento Modelo->Response', () => {
  it('Deve transformar um modelo em response', async () => {
    const responseEsperado = {
      ...notificacaoMapeadoResponse,
      suspeito: suspeitoMapeadoResponse,
      sintomas: sintomasMapeadoResponse,
      comorbidades: comorbidadesMapeadoResponse,
      examesImagem: examesImagemMapedoResponse,
      informacaoComplementar: informacaoComplementarMapeadoResponse,
      vinculoEpidemiologico: vinculoEpidemiologicoMapeadoResponse,
      conclusaoAtendimento: conclusaoAtendimentoMapeadoResponse,
    };

    const response = mapearParaResponse(notificacaoModelo, notificacaoModelo.NotificacaoCovid19);

    expect(response).toEqual(responseEsperado);
  });
});
