const Joi = require('@hapi/joi');

const schemas = {
  create: Joi.object().keys({
    email: Joi.string()
      .email({ tlds: false })
      .required(),
  }),
  get: Joi.object().keys({
    id: Joi.string()
      .guid({ version: 'uuidv4' })
      .required(),
  }),
  delete: Joi.object().keys({
    id: Joi.string()
      .guid({ version: 'uuidv4' })
      .required(),
  }),
  update: Joi.object().keys({
    id: Joi.string()
      .guid({ version: 'uuidv4' })
      .required(),
    email: Joi.string()
      .email({ tlds: false })
      .required(),
  }),
  findByEmail: Joi.object().keys({
    email: Joi.string()
      .email({ tlds: false })
      .required(),
  }),
};

module.exports = schemas;
