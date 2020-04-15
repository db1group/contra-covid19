export const required = (value) => !!value || 'O campo é obrigatório.';
export const maxLength = (length) => (value) => value.length > length || `O campo permite até ${length} caracteres.`;
