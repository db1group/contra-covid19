import NotificacaoEvolucao from '@/entities/NotificacaoEvolucao';

const notifEvolucaoVazia = {
  id: null,
  notificacaoId: '',
  dataHoraAtualizacao: '',
  local: '',
  situacao: '',
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
};

const notifEvolucaoValida = {
  id: 'd67c4ef1-eed6-4c98-b53d-f050a76dfb3a',
  notificacaoId: 'cd6286f5-dc11-4932-98e3-5ff1893885ab',
  dataHoraAtualizacao: '2020-04-18T18:53:00.000Z',
  local: 'ALTA_ISOLAMENTO_DOMICILIAR',
  situacao: 'SUSPEITO',
};

const notifEvolucaoRequestValida = {
  notificacaoId: 'cd6286f5-dc11-4932-98e3-5ff1893885ab',
  dtEvolucao: '2020-04-18T18:53:00.000Z',
  tpLocal: 'ALTA_ISOLAMENTO_DOMICILIAR',
  tpEvolucao: 'SUSPEITO',
};

const notifEvolucaoRequestBodyValida = {
  id: 'd67c4ef1-eed6-4c98-b53d-f050a76dfb3a',
  notificacaoId: 'cd6286f5-dc11-4932-98e3-5ff1893885ab',
  dataHoraAtualizacao: '18/04/2020 18:53',
  local: 'Isolamento domiciliar',
  situacao: 'Suspeito',
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
    const dataRequest = { ...dataNotifEvolucao };
    dataRequest.dtEvolucao = '18/04/2020 18:53';
    const result = new NotificacaoEvolucao(dataRequest).toRequest();
    expect(result).toEqual(notifEvolucaoRequestValida);
  });

  test('Criando nova Notificação Evolução com request body', () => {
    const result = new NotificacaoEvolucao(dataNotifEvolucao).toRequestBody();
    expect(result).toEqual(notifEvolucaoRequestBodyValida);
  });
});
