const RegraNegocioErro = require('../../../../src/lib/erros/RegraNegocioErro');
const NotificacaoResponseMapper = require('../../../../src/mapper/notificacao-mapper/model-para-response');
const {
  notificacaoMapeadoResponse, notificacaoModelo, suspeitoMapeadoResponse,
  sintomasMapeadoResponse, comorbidadesMapeadoResponse, examesImagemMapedoResponse,
  informacaoComplementarMapeadoResponse, vinculoEpidemiologicoMapeadoResponse,
  conclusaoAtendimentoMapeadoResponse,
} = require('./dadosResponse');

const PegarCopiaNotificacaoModelo = () => JSON.parse(JSON.stringify(notificacaoModelo));

describe('Testar mapeamento de modelo para response', () => {
  it('deve mapear modelo para notificacao (cabeçalho)', () => {
    const mapeador = new NotificacaoResponseMapper(notificacaoModelo,
      notificacaoModelo.NotificacaoCovid19);

    const notificacao = mapeador._notificacaoParaResponse();

    expect(notificacao).toEqual(notificacaoMapeadoResponse);
  });

  it('deve mapear profissaoId à partir da notificacao', async () => {
    const mapeador = new NotificacaoResponseMapper(notificacaoModelo,
      notificacaoModelo.NotificacaoCovid19);

    const notificacao = mapeador._notificacaoParaResponse();

    expect(notificacao.profissaoId).toBe(notificacaoMapeadoResponse.profissaoId);
  });
});


describe('Mapeamento de suspeito', () => {
  it('deve mapear modelo para suspeito', async () => {
    const mapeador = new NotificacaoResponseMapper(notificacaoModelo,
      notificacaoModelo.NotificacaoCovid19);

    const suspeito = mapeador._extrairSuspeito();

    expect(suspeito).toEqual(suspeitoMapeadoResponse);
  });

  it('deve mapear municipioId à partir da notificacao.pessoa.bairro.municipioId', async () => {
    const mapeador = new NotificacaoResponseMapper(notificacaoModelo,
      notificacaoModelo.NotificacaoCovid19);

    const suspeito = mapeador._extrairSuspeito();

    expect(suspeito.municipioId).toBe(notificacaoModelo.Pessoa.Bairro.municipioId);
  });

  it('deve emitir erro se notificacao.Pessoa.Bairro for undefined', async () => {
    const notificacao = PegarCopiaNotificacaoModelo();
    delete notificacao.Pessoa.Bairro;

    const mapeador = new NotificacaoResponseMapper(notificacao, notificacao.NotificacaoCovid19);

    expect(() => { mapeador._extrairSuspeito(); }).toThrow(RegraNegocioErro);
  });


  it('deve mapear bairro do suspeito à partir da pessoa', async () => {
    const mapeador = new NotificacaoResponseMapper(notificacaoModelo,
      notificacaoModelo.NotificacaoCovid19);

    const suspeito = mapeador._extrairSuspeito(notificacaoModelo);

    expect(suspeito.bairroId).toBe(notificacaoModelo.Pessoa.bairroId);
  });

  it('deve mapear ocupacaoId do suspeito à partir de Notificacao.Pessoa.ocupacaoId', async () => {
    const mapeador = new NotificacaoResponseMapper(notificacaoModelo,
      notificacaoModelo.NotificacaoCovid19);

    const suspeito = mapeador._extrairSuspeito(notificacaoModelo);

    expect(suspeito.ocupacaoId).toBe(notificacaoModelo.Pessoa.ocupacaoId);
  });

  it('deve mapear pessoaId do suspeito à partir de Notificacao.Pessoa.Id', async () => {
    const mapeador = new NotificacaoResponseMapper(notificacaoModelo,
      notificacaoModelo.NotificacaoCovid19);

    const suspeito = mapeador._extrairSuspeito(notificacaoModelo);

    expect(suspeito.pessoaId).toEqual(notificacaoModelo.Pessoa.id);
  });

  it('deve lançar erro se pessoa não existir', async () => {
    const notificacao = PegarCopiaNotificacaoModelo();
    delete notificacao.Pessoa;
    const mapeador = new NotificacaoResponseMapper(notificacao, notificacao.NotificacaoCovid19);

    expect(() => { mapeador._extrairSuspeito(notificacao); }).toThrow(RegraNegocioErro);
  });

  it('deve deixar dados de município em branco se não existir na Notificacao.Pessoa', async () => {
    const mapeador = new NotificacaoResponseMapper(notificacaoModelo,
      notificacaoModelo.NotificacaoCovid19);
    const notificacao = { ...notificacaoModelo };
    notificacao.Pessoa.Municipio = undefined;

    const suspeito = mapeador._extrairSuspeito(notificacao);

    expect(suspeito.municipio).toBe('');
    expect(suspeito.uf).toBe('PR');
  });
});

describe('Mapeamento sintomas', () => {
  it('deve mapear modelo para sintomas', async () => {
    const mapeador = new NotificacaoResponseMapper(notificacaoModelo,
      notificacaoModelo.NotificacaoCovid19);

    const response = mapeador._extrairSintomas(
      notificacaoModelo.NotificacaoCovid19,
    );

    expect(response).toEqual(sintomasMapeadoResponse);
  });
});

describe('Mapeamento comorbidades', () => {
  it('deve mapear modelo para Comorbidades ', async () => {
    const mapeador = new NotificacaoResponseMapper(notificacaoModelo,
      notificacaoModelo.NotificacaoCovid19);

    const response = mapeador._extrairComorbidades(
      notificacaoModelo.NotificacaoCovid19,
    );

    expect(response).toEqual(comorbidadesMapeadoResponse);
  });
});

describe('Mapeamento examesImagem', () => {
  it('deve mapear modelo para exames imagem', async () => {
    const mapeador = new NotificacaoResponseMapper(notificacaoModelo,
      notificacaoModelo.NotificacaoCovid19);

    const response = mapeador._extrairExamesImagem(
      notificacaoModelo.NotificacaoCovid19,
    );

    expect(response).toEqual(examesImagemMapedoResponse);
  });
});

describe('Mapeamento Informacao Complementar', () => {
  it('deve mapear modelo para Informacao Complementar', async () => {
    const mapeador = new NotificacaoResponseMapper(notificacaoModelo,
      notificacaoModelo.NotificacaoCovid19);

    const response = mapeador._extrairInformacaoComplementar(
      notificacaoModelo.NotificacaoCovid19,
    );

    expect(response).toEqual(informacaoComplementarMapeadoResponse);
  });
});

describe('Vinculo epidemiológico', () => {
  it('deve mapear modelo para Vinculo Epidemiologico', async () => {
    const mapeador = new NotificacaoResponseMapper(notificacaoModelo,
      notificacaoModelo.NotificacaoCovid19);

    const response = mapeador._extrairVinculoEpidemiologico(
      notificacaoModelo.NotificacaoCovid19,
    );

    expect(response).toEqual(vinculoEpidemiologicoMapeadoResponse);
  });
});

describe('Mapeamento Conclusão atendimento', () => {
  it('deve mapear modelo para Conclusão Atendimento', async () => {
    const mapeador = new NotificacaoResponseMapper(notificacaoModelo,
      notificacaoModelo.NotificacaoCovid19);

    const response = mapeador._extrairConclusaoAtendimento(
      notificacaoModelo.NotificacaoCovid19,
    );

    expect(response).toEqual(conclusaoAtendimentoMapeadoResponse);
  });
});
