import NotificacaoEvolucao from '@/entities/NotificacaoEvolucao';

jest.mock('moment', () => () => ({
  format: () => '18/04/2020 15:53',
}));

const dataNotifEvolucao = {
  id: 'd67c4ef1-eed6-4c98-b53d-f050a76dfb3a',
  notificacaoId: 'cd6286f5-dc11-4932-98e3-5ff1893885ab',
  observacao: null,
  dtEvolucao: '2020-04-18T18:53:00.000Z',
  tpEvolucao: 'SUSPEITO',
  tpLocal: 'ALTA_ISOLAMENTO_DOMICILIAR',
  createdAt: '2020-04-20T14:26:53.693Z',
  updatedAt: '2020-04-20T14:26:53.693Z',
  dtfechamento: null,
};

const notifEvolucaoRequestBodyValida = {
  id: 'd67c4ef1-eed6-4c98-b53d-f050a76dfb3a',
  notificacaoId: 'cd6286f5-dc11-4932-98e3-5ff1893885ab',
  dataHoraAtualizacao: '18/04/2020 15:53',
  local: 'Isolamento domiciliar',
  situacao: 'Suspeito',
  createdAt: '18/04/2020 15:53',
  dtfechamento: null,
};

describe('Testes para entidade NotificacaoEvolucao', () => {
  test('Criando nova Notificação Evolução com request body', () => {
    const result = new NotificacaoEvolucao(dataNotifEvolucao).toRequestBody();
    expect(result).toEqual(notifEvolucaoRequestBodyValida);
  });
});
