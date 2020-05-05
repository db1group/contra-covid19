const { requestParaModeloNotificacao, requestParaModeloNotificacaoCovid19 } = require('../../../../src/mapper/notificacao-mapper/request-para-model');
const { notificacaoRequest, notificacaoModeloMapeado } = require('./dadosRequest');

describe('Mapear Notificacao', () => {
  // Está divergindo do modelo -> response
  it('Deve mapear o bairro da notificacao à partir do suspeito', async () => {
    const modelo = requestParaModeloNotificacao(notificacaoRequest);

    expect(modelo.bairroId).toBe(notificacaoRequest.suspeito.bairroId);
  });

  it('Deve mapear o bairro da notificacao à partir do bairro da unidade de saúde', async () => {
    const modelo = requestParaModeloNotificacao(notificacaoRequest);

    expect(modelo.municipioId).toBe(notificacaoRequest.unidadeDeSaude.municipioId);
  });

  it('Deve Notificacao.pessoaId deve ser o Suspeito.pessoaId', async () => {
    const modelo = requestParaModeloNotificacao(notificacaoRequest);

    expect(modelo.pessoaId).toBe(notificacaoRequest.suspeito.pessoaId);
  });

  it('deve transformar o request em Notificacao', async () => {
    const notificacao = { ...notificacaoRequest };
    const notificacaoEsperada = {
      bairroId: notificacaoRequest.suspeito.bairroId,
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
