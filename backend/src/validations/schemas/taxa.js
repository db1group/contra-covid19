const Joi = require('@hapi/joi');

const schemas = {
  cadastrar: Joi.object().keys({
    ocupacao: Joi.number().greater(0),
    positividade: Joi.number().greater(0),
    dtfechamento: Joi.date().required(),
  }),
};

module.exports = schemas;
