const Joi = require('@hapi/joi');

const schemas = {
  consultaPorNome: Joi.object().keys({
    nome: Joi.string().min(3).max(60).required(),
  }),
};
module.exports = schemas;
