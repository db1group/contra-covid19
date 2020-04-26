import DateService from '@/services/DateService';

const DATE_FORMAT = /^[0-3]{1}[0-9]{1}\/[0-1]{1}[0-9]{1}\/[0-9]{4}$/;
const DATE_HOUR_MINUTE_FORMAT = /^[0-3]{1}[0-9]{1}\/[0-1]{1}[0-9]{1}\/[0-9]{4} [0-2]{1}[0-9]{1}:[0-5]{1}[0-9]{1}$/;

export const required = (value, message = 'O campo é obrigatório.') => (
  (value && typeof value === 'string' && value.trim().length > 0)
  || (value && typeof value === 'number' && value > 0)
  || (value && typeof value === 'boolean')
) || message;

export const requiredObjectId = (value, message = 'O campo é obrigatório.') => (
  (value && typeof value === 'object' && !!value.id)
) || message;

export const minLength = (length) => (value) => !value
  || value.length >= length
  || `O campo precisa de pelo menos ${length} caracteres.`;
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
