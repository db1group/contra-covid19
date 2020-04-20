const Joi = require('@hapi/joi');

const schemas = {
  consultaPorNome: Joi.object().keys({
    nome: Joi.string().max(60),
  }),
};
module.exports = schemas;
