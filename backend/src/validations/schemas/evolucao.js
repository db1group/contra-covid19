const Joi = require('@hapi/joi');

const schemas = {
  alterar: Joi.object().keys({
    createdAt: Joi.date()
      .iso()
      .max('now')
      .message('Data de criação deve ser menor ou igual de hoje.')
      .required(),
  }),
};

module.exports = schemas;
