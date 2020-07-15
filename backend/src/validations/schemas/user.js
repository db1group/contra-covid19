const Joi = require('@hapi/joi');

const schemas = {
  create: Joi.object().keys({
    nome: Joi.string().min(3).max(150).required(),
    email: Joi.string()
      .email({ tlds: false })
      .required(),
    unidadeSaudeId: Joi.string()
      .guid({ version: 'uuidv4' })
      .required(),
    permissoes: Joi.array(),
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
    nome: Joi.string().min(3).max(150).required(),
    email: Joi.string()
      .email({ tlds: false })
      .required(),
    unidadeSaudeId: Joi.string()
      .guid({ version: 'uuidv4' })
      .required(),
    permissoes: Joi.array(),
  }),
  findByEmail: Joi.object().keys({
    email: Joi.string()
      .email({ tlds: false })
      .required(),
  }),
};

module.exports = schemas;
