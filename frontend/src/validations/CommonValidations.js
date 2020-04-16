export const required = (value, message = 'O campo é obrigatório.') => !!value || message;
export const maxLength = (length) => (value) => value.length > length || `O campo permite até ${length} caracteres.`;
