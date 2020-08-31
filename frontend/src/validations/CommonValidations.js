import moment from 'moment';
import DateService from '@/services/DateService';

const DATE_FORMAT = /^[0-3]{1}[0-9]{1}\/[0-1]{1}[0-9]{1}\/[0-9]{4}$/;
const DATE_HOUR_MINUTE_FORMAT = /^[0-3]{1}[0-9]{1}\/[0-1]{1}[0-9]{1}\/[0-9]{4} [0-2]{1}[0-9]{1}:[0-5]{1}[0-9]{1}$/;
const ONLY_LETTERS = new RegExp(/^[a-zA-Z\s.\u00C0-\u00FC]*$/);
const ONLY_NUMBERS = new RegExp(/^[0-9]+$/);
const HOUR_MINUTE_FORMAT = /^[0-2]{1}[0-9]{1}:[0-5]{1}[0-9]{1}$/;

export const required = (value, message = 'O campo é obrigatório.') => (
  (value && typeof value === 'string' && value.trim().length > 0)
  || (value && typeof value === 'number' && value > 0)
  || (value && typeof value === 'boolean')
) || message;

export const requiredObjectId = (value, message = 'O campo é obrigatório.') => (
  (value && typeof value === 'object' && !!value.id)
) || message;

export const onlyLetters = (
  value,
  message = 'É permitido somente letras.',
) => !value || (value && ONLY_LETTERS.test(value)) || message;

export const onlyCardinalNumbers = (
  value,
  message = 'É permitido somente números positivos.',
) => (value.toString() && ONLY_NUMBERS.test(value.toString())) || message;

export const minLengthNumbers = (length) => (
  value,
  message = `O campo precisa de pelo menos ${length} números.`,
) => !value || (value && ONLY_NUMBERS.test(value) && value.length >= length) || message;

export const minLength = (length) => (value) => !value
  || value.length >= length
  || `O campo precisa de pelo menos ${length} caracteres.`;
export const minLengthNumbersWithMask = (length) => (value) => {
  const valueWithoutMask = value.replace(/[^0-9]/g, '');
  return !valueWithoutMask || valueWithoutMask.length >= length
    || `O campo precisa de pelo menos ${length} caracteres.`;
};
export const maxLengthNumbersWithMask = (length) => (value) => {
  const valueWithoutMask = value.replace(/[^0-9]/g, '');
  return !valueWithoutMask || valueWithoutMask.length <= length
    || `O campo precisa ser menor que ${length} caracteres.`;
};

export const exactLengthNumbersWithMask = (length) => (value) => {
  const valueWithoutMask = value.replace(/[^0-9]/g, '');
  return !valueWithoutMask || valueWithoutMask.length === length
    || `O campo deve possuir ${length} caracteres.`;
};
export const maxLength = (length) => (value) => !value
  || value.length <= length
  || `O campo tem limite máximo de ${length} caracteres.`;
export const exactLength = (length) => (value) => !value
  || value.length === length
  || `O campo deve possuir ${length} caracteres.`;
export const dateFormat = (value) => !value
  || (DATE_FORMAT.test(value) && DateService.isDateValid(value, 'DD/MM/YYYY'))
  || 'O formato precisa ser dd/mm/aaaa';
export const dateHourMinuteFormat = (value) => !value
  || (DATE_HOUR_MINUTE_FORMAT.test(value) && DateService.isDateValid(value, 'DD/MM/YYYY HH:mm'))
  || 'O formato precisa ser dd/mm/aaaa hh:mm';
export const lessThanMaximumDate = (
  value,
  valueForComparation,
  message = 'Informe uma data igual ou anterior.',
) => !value
  || (DateService.isLesserEqualsThanMaximumDate(value, valueForComparation))
  || message;
export const greaterThanMinimumDate = (
  value,
  valueForComparation,
  message = 'Informe uma data igual ou posterior.',
) => !value
  || (DateService.isGreaterEqualsThanMinimumDate(value, valueForComparation))
  || message;
export const lessThanMaximumDateWithMinutes = (
  value,
  valueForComparation,
  message = 'Informe uma data igual ou anterior.',
) => !value
  || (DateService.isLesserEqualsThanMaximumDateWithMinutes(value, valueForComparation))
  || message;
export const greaterThanMinimumDateWithMinutes = (
  value,
  valueForComparation,
  message = 'Informe uma data igual ou posterior.',
) => !value
  || (DateService.isGreaterEqualsThanMinimumDateWithMinutes(value, valueForComparation))
  || message;
export const dateMustBeLesserEqualsThanToday = (
  value,
  message = 'A data informada deve ser anterior ou igual a hoje.',
) => !value
  || value.length < 10
  || (DateService.isLesserEqualsThanMaximumDate(value))
  || message;
export const dateMustBeLesserEqualsThanTodayWithMinutes = (
  value,
  message = 'A data informada deve ser anterior ou igual a atual.',
) => !value
  || value.length < 16
  || (DateService.isLesserEqualsThanMaximumDateWithMinutes(value))
  || message;
export const dateMustBeLesserThanToday = (
  value,
  message = 'A data informada deve ser anterior a de hoje.',
) => !value
  || value.length < 10
  || (DateService.isLesserThanToday(value))
  || message;
export const maxAge = (limitAge) => (value) => {
  const stringToDate = moment(value, 'DD/MM/YYYY').toDate('YYYY-MM-DD');
  const personAge = moment().diff(stringToDate, 'years', true);
  return !value || personAge <= limitAge
    || `O paciente deve ter até ${limitAge} anos.`;
};

export const mustBeEmpty = (value, message = 'O campo deve estar vazio.') => !value
  || value.toString().length === 0
  || message;

export const notBrasil = (value,
  message = 'Utilize um país diferente de "Brasil" caso seja estrangeiro.') => value.toString() !== '1'
  || message;

export const hourMinuteFormat = (value) => !value
  || (HOUR_MINUTE_FORMAT.test(value) && DateService.isDateValid(value, 'HH:mm'))
  || 'O formato precisa ser hh:mm';

export const cellphoneNumberValid = (value, message = 'Celular após o DDD deve iniciar com 9.') => {
  const valueWithoutMask = value.replace(/[^0-9]/g, '');
  return !valueWithoutMask || /^[0-9]{2}9/.test(valueWithoutMask) || message;
};
