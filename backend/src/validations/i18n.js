module.exports = ({ context }) => ({
  ptbr: {
    'number.min': `"${context.label}" deve ser maior ou igual que ${context.limit}`,
    'number.max': `"${context.label}" deve ser menor ou igual que ${context.limit}`,
    'number.unsafe': `"${context.label}" precisa ser um número válido`,
    'date.format': `"${context.label}" deve estar no formato de data ISO 8601`,
    'date.base': `"${context.label}" deve ser uma data válida`,
    'string.base': `"${context.label}" deve ser um alfanumérico`,
    'string.min': `"${context.label}" deve conter pelo menos ${context.limit} caracteres`,
    'string.max': `"${context.label}" deve conter no máximo ${context.limit} caracteres`,
    'string.empty': `"${context.label}" não pode ser vazio`,
    'string.pattern.base': `"${context.label}" não possui o formato válido ${context.regex}`,
    'string.guid': `"${context.label}" deve ser uma GUID válida`,
    'number.base': `"${context.label}" deve ser um número`,
    'object.base': `"${context.label}" deve ser um objeto`,
    'any.required': `"${context.label}" é obrigatório`,
    'boolean.base': `"${context.label}" dever conter um valor lógico`,
  },
});
