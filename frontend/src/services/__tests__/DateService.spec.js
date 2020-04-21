import DateService from '../DateService';

describe('Serviço de mudança de formato de data', () => {
  test('Deve converter data corretamente', () => {
    const result = DateService.changeFormat('18/10/1994', 'DD/MM/YYYY', 'YYYY-MM-DD');
    expect(result).toBe('1994-10-18');
  });

  test('Deve retornar null para data não preenchida', () => {
    const result = DateService.changeFormat('', 'DD/MM/YYYY', 'YYYY-MM-DD');
    expect(result).toBeNull();
  });
});
