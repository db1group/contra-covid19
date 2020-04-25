import Evolucao from '@/entities/Evolucao';

jest.mock('moment', () => () => ({
  format: () => '18/04/2020 12:53',
}));

const evolucaoVazia = {
  id: null,
  status: 'ABERTA',
  nome: '',
  documento: '',
  telefone: '',
  items: [],
};

const dataEvolucao = {
  status: 'ABERTA',
  Pessoa: {
    nome: 'Francisco Thiago de Almeida',
    numeroDocumento: '32201501874',
    telefoneContato: '111111111111',
  },
  NotificacaoEvolucaos: [
    {
      id: 'd67c4ef1-eed6-4c98-b53d-f050a76dfb3a',
      notificacaoId: 'cd6286f5-dc11-4932-98e3-5ff1893885ab',
      observacao: null,
      dtEvolucao: '2020-04-18T15:53:01.553Z',
      tpEvolucao: 'SUSPEITO',
      tpLocal: 'ALTA_ISOLAMENTO_DOMICILIAR',
      createdAt: '2020-04-20T14:26:53.693Z',
      updatedAt: '2020-04-20T14:26:53.693Z',
    },
  ],
};

const evolucaoValida = {
  id: null,
  status: 'ABERTA',
  nome: 'Francisco Thiago de Almeida',
  documento: '32201501874',
  telefone: '111111111111',
  items: [
    {
      id: 'd67c4ef1-eed6-4c98-b53d-f050a76dfb3a',
      notificacaoId: 'cd6286f5-dc11-4932-98e3-5ff1893885ab',
      observacao: null,
      dtEvolucao: '2020-04-18T15:53:01.553Z',
      tpEvolucao: 'SUSPEITO',
      tpLocal: 'ALTA_ISOLAMENTO_DOMICILIAR',
      createdAt: '2020-04-20T14:26:53.693Z',
      updatedAt: '2020-04-20T14:26:53.693Z',
    },
  ],
};

const evolucaoRequestValida = {
  id: null,
  status: 'ABERTA',
  nome: 'Francisco Thiago de Almeida',
  documento: '32201501874',
  telefone: '111111111111',
  items: [
    {
      id: 'd67c4ef1-eed6-4c98-b53d-f050a76dfb3a',
      notificacaoId: 'cd6286f5-dc11-4932-98e3-5ff1893885ab',
      dataHoraAtualizacao: '18/04/2020 12:53',
      local: 'Isolamento domiciliar',
      situacao: 'Suspeito',
    },
  ],
};

describe('Testes para entidade Evolucao', () => {
  test('Criando nova Evolução', () => {
    const result = new Evolucao();
    expect(result).toEqual(evolucaoVazia);
  });

  test('Criando nova Evolução com dados', () => {
    const result = new Evolucao(dataEvolucao);
    expect(result).toEqual(evolucaoValida);
  });

  test('Criando nova Evolução com request', () => {
    const result = new Evolucao(dataEvolucao).toRequestBody();
    expect(result).toEqual(evolucaoRequestValida);
  });
});
