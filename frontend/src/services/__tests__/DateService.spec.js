import moment from 'moment';
import DateService from '../DateService';

describe('Serviço de transformação de data em objeto moment', () => {
  const expected = moment('01/10/1994 05:52:04', 'DD/MM/YYYY HH:mm:ss');
  const result = DateService.toMomentObject('01/10/1994 05:52:04', 'DD/MM/YYYY HH:mm:ss');
  expect(result).toStrictEqual(expected);
});

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

describe('Serviço de comparação de datas. Verifica se é menor, comparando horário', () => {
  test('Deve ser menor, retornando true', () => {
    const result = DateService.isLesserEqualsThanMaximumDateWithMinutes('25/04/2020 00:00', '26/04/2020 00:00');
    expect(result).toBeTruthy();
  });
  test('Deve ser menor considerando horário, retornando true', () => {
    const result = DateService.isLesserEqualsThanMaximumDateWithMinutes('26/04/2020 00:00', '26/04/2020 00:01');
    expect(result).toBeTruthy();
  });
  test('Deve ser igual, retornando true', () => {
    const result = DateService.isLesserEqualsThanMaximumDateWithMinutes('26/04/2020 00:00', '26/04/2020 00:00');
    expect(result).toBeTruthy();
  });
  test('Deve ser maior, retornando false', () => {
    const result = DateService.isLesserEqualsThanMaximumDateWithMinutes('27/04/2020 00:00', '26/04/2020 00:00');
    expect(result).toBeFalsy();
  });
  test('Deve ser maior considerando horário, retornando false', () => {
    const result = DateService.isLesserEqualsThanMaximumDateWithMinutes('27/04/2020 00:01', '27/04/2020 00:00');
    expect(result).toBeFalsy();
  });
});

describe('Serviço de comparação de datas. Verifica se é menor', () => {
  test('Deve ser menor, retornando true', () => {
    const result = DateService.isLesserEqualsThanMaximumDate('25/04/2020', '26/04/2020');
    expect(result).toBeTruthy();
  });
  test('Deve ser igual, retornando true', () => {
    const result = DateService.isLesserEqualsThanMaximumDate('26/04/2020', '26/04/2020');
    expect(result).toBeTruthy();
  });
  test('Deve ser maior, retornando false', () => {
    const result = DateService.isLesserEqualsThanMaximumDate('27/04/2020', '26/04/2020');
    expect(result).toBeFalsy();
  });
  test('Deve ser maior com mesmo dia em outro mês, retornando false', () => {
    const result = DateService.isLesserEqualsThanMaximumDate('26/05/2020', '26/04/2020');
    expect(result).toBeFalsy();
  });
});

describe('Serviço de comparação de datas. Verifica se é maior, comparando horário', () => {
  test('Deve ser maior, retornando true', () => {
    const result = DateService.isGreaterEqualsThanMinimumDateWithMinutes('27/04/2020 00:00', '26/04/2020 00:00');
    expect(result).toBeTruthy();
  });
  test('Deve ser maior considerando horário, retornando true', () => {
    const result = DateService.isGreaterEqualsThanMinimumDateWithMinutes('26/04/2020 00:01', '26/04/2020 00:00');
    expect(result).toBeTruthy();
  });
  test('Deve ser igual, retornando true', () => {
    const result = DateService.isGreaterEqualsThanMinimumDateWithMinutes('26/04/2020 00:00', '26/04/2020 00:00');
    expect(result).toBeTruthy();
  });
  test('Deve ser menor, retornando false', () => {
    const result = DateService.isGreaterEqualsThanMinimumDateWithMinutes('26/04/2020 00:00', '27/04/2020 00:00');
    expect(result).toBeFalsy();
  });
  test('Deve ser menor considerando horário, retornando false', () => {
    const result = DateService.isGreaterEqualsThanMinimumDateWithMinutes('27/04/2020 00:00', '27/04/2020 00:01');
    expect(result).toBeFalsy();
  });
});

describe('Serviço de comparação de datas. Verifica se é maior', () => {
  test('Deve ser maior, retornando true', () => {
    const result = DateService.isGreaterEqualsThanMinimumDate('27/04/2020', '26/04/2020');
    expect(result).toBeTruthy();
  });
  test('Deve ser igual, retornando true', () => {
    const result = DateService.isGreaterEqualsThanMinimumDate('26/04/2020', '26/04/2020');
    expect(result).toBeTruthy();
  });
  test('Deve ser menor, retornando false', () => {
    const result = DateService.isGreaterEqualsThanMinimumDate('26/04/2020', '27/04/2020');
    expect(result).toBeFalsy();
  });
  test('Deve ser menor com mesmo dia em outro mês, retornando false', () => {
    const result = DateService.isGreaterEqualsThanMinimumDate('26/04/2020', '26/05/2020');
    expect(result).toBeFalsy();
  });
});
