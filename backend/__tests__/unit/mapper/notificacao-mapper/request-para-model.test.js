const { requestParaModeloNotificacao, requestParaModeloNotificacaoCovid19 } = require('../../../../src/mapper/notificacao-mapper/request-para-model');
const { notificacaoRequest, notificacaoModeloMapeado } = require('./dadosRequest');

describe('Mapear Notificacao', () => {
  it('Deve Notificacao.pessoaId deve ser o Suspeito.pessoaId', async () => {
    const modelo = requestParaModeloNotificacao(notificacaoRequest);

    expect(modelo.pessoaId).toBe(notificacaoRequest.suspeito.pessoaId);
  });

  it('deve transformar o request em Notificacao', async () => {
    const notificacao = { ...notificacaoRequest };
    const notificacaoEsperada = {
      municipioId: notificacaoRequest.unidadeDeSaude.municipioId,
      nomeNotificador: notificacaoRequest.nomeNotificador,
      notificadorId: notificacaoRequest.notificadorId,
      pessoaId: notificacaoRequest.suspeito.pessoaId,
      profissaoId: notificacaoRequest.profissaoId,
      status: notificacaoRequest.status,
      unidadeSaudeId: notificacaoRequest.unidadeSaudeId,
      userId: notificacaoRequest.userId,
    };

    const modeloNotificacao = requestParaModeloNotificacao(notificacao);

    expect(modeloNotificacao).toEqual(notificacaoEsperada);
  });

  it('Deve informar pessoaId: null se não existente', async () => {
    const notificacaoSemPessoa = { ...notificacaoRequest };
    notificacaoSemPessoa.suspeito.pessoaId = undefined;

    const modelo = requestParaModeloNotificacao(notificacaoSemPessoa);

    expect(modelo.pessoaId).toBe(undefined);
  });
});

describe('Mapear NotificacaoCovid19', () => {
  it('deve transformar o request em notificacaoCovid19', async () => {
    const notificacaoCovid19 = requestParaModeloNotificacaoCovid19(notificacaoRequest);

    expect(notificacaoCovid19).toEqual(notificacaoModeloMapeado.notificacaoCovid19);
  });
});
