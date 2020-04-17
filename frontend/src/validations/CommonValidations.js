const DATE_FORMAT = /^[0-3]{1}[0-9]{1}\/[0-1]{1}[0-9]{1}\/[0-9]{4}$/;
const DATE_HOUR_MINUTE_FORMAT = /^[0-3]{1}[0-9]{1}\/[0-1]{1}[0-9]{1}\/[0-9]{4} [0-2]{1}[0-9]{1}:[0-5]{1}[0-9]{1}$/;

export const required = (value, message = 'O campo é obrigatório.') => !!value || message;
export const minLength = (length) => (value) => !value
  || value.length >= length
  || `O campo precisa de pelo menos ${length} caracteres.`;
export const dateFormat = (value) => !value || DATE_FORMAT.test(value) || 'O formato precisa ser dd/mm/aaaa';
export const dateHourMinuteFormat = (value) => !value
  || DATE_HOUR_MINUTE_FORMAT.test(value)
  || 'O formato precisa ser dd/mm/aaaa hh:mm';
