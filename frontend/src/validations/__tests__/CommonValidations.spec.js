import {
  required,
  minLength,
  dateFormat,
  dateHourMinuteFormat,
} from '../CommonValidations';

describe('Testes para validador de campo obrigatório', () => {
  test('Campo obrigatório nulo não pode ser válido', () => {
    const result = required(null);
    expect(result).toBe('O campo é obrigatório.');
  });

  test('Campo obrigatório undefined não pode ser válido', () => {
    const result = required(undefined);
    expect(result).toBe('O campo é obrigatório.');
  });

  test('Campo obrigatório vazio não pode ser válido', () => {
    const result = required('');
    expect(result).toBe('O campo é obrigatório.');
  });

  test('Campo obrigatório informado é válido', () => {
    const result = required('a');
    expect(result).toBeTruthy();
  });

  test('Campo obrigatório não informado com mensagem personalizada', () => {
    const result = required('', 'Deu ruim aí mano =(');
    expect(result).toBe('Deu ruim aí mano =(');
  });
});

describe('Testes para validador de tamanho mínimo', () => {
  test('Campo vazio deve ser válido', () => {
    const result = minLength(11)('');
    expect(result).toBeTruthy();
  });

  test('Campo com menos caracteres que o necessário deve ser inválido', () => {
    const result = minLength(11)('uuddlrlrba');
    expect(result).toBe('O campo precisa de pelo menos 11 caracteres.');
  });

  test('Campo com o tamanho mínimo deve ser válido', () => {
    const result = minLength(11)('uuddlrlrbas');
    expect(result).toBeTruthy();
  });

  test('Campo com o tamanho maior que o necessário deve ser válido', () => {
    const result = minLength(11)('uuddlrlrbasssss');
    expect(result).toBeTruthy();
  });
});

describe('Testes para validador de data', () => {
  test('Data vazia deve ser válida', () => {
    const result = dateFormat('');
    expect(result).toBeTruthy();
  });

  test('Data nula deve ser válida', () => {
    const result = dateFormat(null);
    expect(result).toBeTruthy();
  });

  test('Data preenchida corretamente deve ser válida', () => {
    const result = dateFormat('16/04/2020');
    expect(result).toBeTruthy();
  });

  test('Data preenchida com campos errados deve ser inválida', () => {
    const result = dateFormat('36/19/2020');
    expect(result).toBe('O formato precisa ser dd/mm/aaaa');
  });
});

describe('Testes para validador de data/hora', () => {
  test('Data hora minuto vazia deve ser válida', () => {
    const result = dateHourMinuteFormat('');
    expect(result).toBeTruthy();
  });

  test('Data hora minuto nula deve ser válida', () => {
    const result = dateHourMinuteFormat(null);
    expect(result).toBeTruthy();
  });

  test('Data hora minuto preenchida corretamente deve ser válida', () => {
    const result = dateHourMinuteFormat('16/04/2020 23:40');
    expect(result).toBeTruthy();
  });

  test('Data hora minuto preenchida sem horas e minutos deve ser inválida', () => {
    const result = dateHourMinuteFormat('16/04/2020');
    expect(result).toBe('O formato precisa ser dd/mm/aaaa hh:mm');
  });

  test('Data hora minuto preenchida com campos errados deve ser inválida', () => {
    const result = dateHourMinuteFormat('36/19/2020 29:50');
    expect(result).toBe('O formato precisa ser dd/mm/aaaa hh:mm');
  });
});
