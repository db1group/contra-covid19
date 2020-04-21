const Joi = require('@hapi/joi');

const TAMANHO_CAMPO_NOME = 60;
const schemas = {
  consultaPorNome: Joi.object().keys({
    nome: Joi.string().max(TAMANHO_CAMPO_NOME),
  }),
  cadastrar: Joi.object().keys({
    nome: Joi.string().max(TAMANHO_CAMPO_NOME),
  }),
};
module.exports = schemas;
