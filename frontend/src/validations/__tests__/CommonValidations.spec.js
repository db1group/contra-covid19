import moment from 'moment';
import {
  required,
  minLength,
  exactLength,
  dateFormat,
  dateHourMinuteFormat,
  dateMustBeLesserEqualsThanToday,
  dateMustBeLesserThanToday,
  onlyLetters,
  maxLength,
  minLengthNumbersWithMask,
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

  test('Campo obrigatório com espaços em branco não pode ser válido', () => {
    const result = required('   ');
    expect(result).toBe('O campo é obrigatório.');
  });

  test('Campo obrigatório com inteiro deve pode ser válido', () => {
    const result = required(5);
    expect(result).toBeTruthy();
  });

  test('Campo obrigatório com zero inteiro deve pode ser válido', () => {
    const result = required(0);
    expect(result).toBeTruthy();
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

describe('Testes para validador de tamanho mínimo de números com máscara', () => {
  test('Campo vazio deve ser válido', () => {
    const result = minLengthNumbersWithMask(11)('');
    expect(result).toBeTruthy();
  });
  test('Campo com menos caracteres que o necessário deve ser inválido', () => {
    const result = minLengthNumbersWithMask(11)('(44)9999-99');
    expect(result).toBe('O campo precisa de pelo menos 11 caracteres.');
  });
  test('Campo com o tamanho mínimo deve ser válido', () => {
    const result = minLengthNumbersWithMask(11)('(44)99999-9999');
    expect(result).toBeTruthy();
  });
  test('Campo com o tamanho maior que o necessário deve ser válido', () => {
    const result = minLengthNumbersWithMask(11)('(44)99999-99999');
    expect(result).toBeTruthy();
  });
});

describe('Testes para validador de tamanho máximo', () => {
  test('Campo vazio deve ser válido', () => {
    const result = maxLength(10)('');
    expect(result).toBeTruthy();
  });
  test('Campo com menos caracteres ou igual ao aceitável deve ser válido', () => {
    const result = maxLength(10)('1234567890');
    expect(result).toBeTruthy();
  });
  test('Campo com mais caracteres que o aceitável deve ser inválido', () => {
    const result = maxLength(10)('uuddlrlrba adads asd asd as asd a');
    expect(result).toBe('O campo tem limite máximo de 10 caracteres.');
  });
});

describe('Testes para validador de tamanho exato', () => {
  test('Campo vazio deve ser válido', () => {
    const result = exactLength(11)('');
    expect(result).toBeTruthy();
  });

  test('Campo com menos caracteres que o necessário deve ser inválido', () => {
    const result = exactLength(11)('uuddlrlrba');
    expect(result).toBe('O campo deve possuir 11 caracteres.');
  });

  test('Campo com o tamanho exigido deve ser válido', () => {
    const result = exactLength(11)('uuddlrlrbas');
    expect(result).toBeTruthy();
  });

  test('Campo com o tamanho maior que o necessário deve ser inválido', () => {
    const result = exactLength(11)('uuddlrlrbasssss');
    expect(result).toBe('O campo deve possuir 11 caracteres.');
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

describe('Testes para validador de data menor ou igual a hoje', () => {
  test('Data não informada deve ser válida', () => {
    const result = dateMustBeLesserEqualsThanToday('');
    expect(result).toBeTruthy();
  });
  test('Data nula deve ser válida', () => {
    const result = dateMustBeLesserEqualsThanToday(null);
    expect(result).toBeTruthy();
  });
  test('Data undefined deve ser válida', () => {
    const result = dateMustBeLesserEqualsThanToday();
    expect(result).toBeTruthy();
  });
  test('Data menor que hoje deve ser válida', () => {
    const result = dateMustBeLesserEqualsThanToday('01/04/2020');
    expect(result).toBeTruthy();
  });
  test('Data ainda não terminada a digitação deve ser válida', () => {
    const result = dateMustBeLesserEqualsThanToday('01/04/');
    expect(result).toBeTruthy();
  });
  test('Data ainda não terminada a digitação com ano incompleto deve ser válida', () => {
    const result = dateMustBeLesserEqualsThanToday('01/04/202');
    expect(result).toBeTruthy();
  });
  test('Data posterior a hoje deve ser inválida', () => {
    const result = dateMustBeLesserEqualsThanToday('01/04/2220');
    expect(result).toBe('A data informada deve ser anterior ou igual a hoje.');
  });
  test('Data posterior a hoje deve ser inválida com mensagem customizada', () => {
    const result = dateMustBeLesserEqualsThanToday('01/04/2220', 'Ih rapaz, deu ruim aqui');
    expect(result).toBe('Ih rapaz, deu ruim aqui');
  });
});

describe('Testes para validador de data menor a hoje', () => {
  test('Data não informada deve ser válida', () => {
    const result = dateMustBeLesserThanToday('');
    expect(result).toBeTruthy();
  });
  test('Data nula deve ser válida', () => {
    const result = dateMustBeLesserThanToday(null);
    expect(result).toBeTruthy();
  });
  test('Data undefined deve ser válida', () => {
    const result = dateMustBeLesserThanToday();
    expect(result).toBeTruthy();
  });
  test('Data menor que hoje deve ser válida', () => {
    const result = dateMustBeLesserThanToday('01/04/2020');
    expect(result).toBeTruthy();
  });
  test('Data ainda não terminada a digitação deve ser válida', () => {
    const result = dateMustBeLesserThanToday('01/04/');
    expect(result).toBeTruthy();
  });
  test('Data ainda não terminada a digitação com ano incompleto deve ser válida', () => {
    const result = dateMustBeLesserThanToday('01/04/202');
    expect(result).toBeTruthy();
  });
  test('Data igual a hoje deve ser inválida', () => {
    const result = dateMustBeLesserThanToday(moment());
    expect(result).toBe('A data informada deve ser anterior a de hoje.');
  });
  test('Data posterior a hoje deve ser inválida', () => {
    const result = dateMustBeLesserThanToday('01/04/2220');
    expect(result).toBe('A data informada deve ser anterior a de hoje.');
  });
  test('Data posterior a hoje deve ser inválida com mensagem customizada', () => {
    const result = dateMustBeLesserThanToday('01/04/2220', 'Ih rapaz, deu ruim aqui');
    expect(result).toBe('Ih rapaz, deu ruim aqui');
  });
});

describe('Testes para validador de somente letras', () => {
  test('Campo com caracteres especiais deve ser inválido', () => {
    const result = onlyLetters('uuddlrlrba ás $@');
    expect(result).toBe('É permitido somente letras.');
  });
  test('Campo com com números deve ser inválido', () => {
    const result = onlyLetters('uuddlrlrba 1');
    expect(result).toBe('É permitido somente letras.');
  });
  test('Campo com somente letras e possíveis acentos deve ser válido', () => {
    const result = onlyLetters('uuddlrlrba ásadas ão');
    expect(result).toBeTruthy();
  });
});
