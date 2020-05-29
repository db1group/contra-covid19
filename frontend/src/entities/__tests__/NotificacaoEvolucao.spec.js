import NotificacaoEvolucao from '@/entities/NotificacaoEvolucao';

jest.mock('moment', () => () => ({
  format: () => '18/04/2020 18:53',
}));

// eslint-disable-next-line no-unused-vars
jest.mock('moment', (stringDate, format) => () => ({
  toISOString: () => '2020-04-18T18:53:00.000Z',
}));

const notifEvolucaoVazia = {
  id: null,
  notificacaoId: '',
  dataHoraAtualizacao: '',
  local: '',
  situacao: '',
  createdAt: null,
  dtfechamento: null,
};

const dataNotifEvolucao = {
  id: 'd67c4ef1-eed6-4c98-b53d-f050a76dfb3a',
  notificacaoId: 'cd6286f5-dc11-4932-98e3-5ff1893885ab',
  observacao: null,
  dtEvolucao: '2020-04-18T18:53:00.000Z',
  tpEvolucao: 'SUSPEITO',
  tpLocal: 'ALTA_ISOLAMENTO_DOMICILIAR',
  createdAt: '2020-04-20T14:26:53.693Z',
  updatedAt: '2020-04-20T14:26:53.693Z',
  dtfechamento: '2020-04-20T14:26:53.693Z',
};

const notifEvolucaoValida = {
  id: 'd67c4ef1-eed6-4c98-b53d-f050a76dfb3a',
  notificacaoId: 'cd6286f5-dc11-4932-98e3-5ff1893885ab',
  dataHoraAtualizacao: '2020-04-18T18:53:00.000Z',
  local: 'ALTA_ISOLAMENTO_DOMICILIAR',
  situacao: 'SUSPEITO',
  createdAt: '2020-04-20T14:26:53.693Z',
  dtfechamento: '2020-04-20T14:26:53.693Z',
};

const notifEvolucaoRequestValida = {
  notificacaoId: 'cd6286f5-dc11-4932-98e3-5ff1893885ab',
  dtEvolucao: '2020-04-18T18:53:00.000Z',
  tpLocal: 'ALTA_ISOLAMENTO_DOMICILIAR',
  tpEvolucao: 'SUSPEITO',
  createdAt: '2020-04-18T18:53:00.000Z',
  dtfechamento: '2020-04-18T18:53:00.000Z',
};

describe('Testes para entidade NotificacaoEvolucao', () => {
  test('Criando nova Notificação Evolução', () => {
    const result = new NotificacaoEvolucao();
    expect(result).toEqual(notifEvolucaoVazia);
  });

  test('Criando nova Notificação Evolução com dados', () => {
    const result = new NotificacaoEvolucao(dataNotifEvolucao);
    expect(result).toEqual(notifEvolucaoValida);
  });

  test('Criando nova Notificação Evolução com request', () => {
    const result = new NotificacaoEvolucao(dataNotifEvolucao).toRequest();
    expect(result).toEqual(notifEvolucaoRequestValida);
  });
});
