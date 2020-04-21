module.exports = (palavra) => palavra.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
