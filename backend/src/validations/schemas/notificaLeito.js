const Joi = require('@hapi/joi');

const stringOrNumber = Joi.alternatives()
  .try(Joi.string()
    .pattern(/^[0-9]+$/)
    .required(),
  Joi.number()
    .integer()
    .min(0)
    .required());

const controleLeitos = {
  qtEnfermariaCovid: stringOrNumber,
  qtUTIAdultaCovid: stringOrNumber,
  qtUTIPedCovid: stringOrNumber,
  qtUTINeoCovid: stringOrNumber,
  qtEnfermariaNormal: stringOrNumber,
  qtUTIAdultaNormal: stringOrNumber,
  qtUTIPedNormal: stringOrNumber,
  qtUTINeoNormal: stringOrNumber,
  qtEnfermariaPrivado: stringOrNumber,
  qtUTIAdultaPrivado: stringOrNumber,
  qtUTIPedPrivado: stringOrNumber,
  qtUTINeoPrivado: stringOrNumber,
};

const schemas = {
  consultarPorUnidade: Joi.object().keys({
    unidadeSaudeId: Joi.string().guid({ version: 'uuidv4' }),
  }),
  consultar: Joi.object().keys({
    page: Joi.number().greater(0),
    itemsPerPage: Joi.number().greater(0).max(100),
    search: Joi.date(),
  }),
  consultarId: Joi.object().keys({
    unidadeSaudeId: Joi.string().guid({ version: 'uuidv4' }),
    id: Joi.string().guid({ version: 'uuidv4' }),
  }),
  cadastrar: Joi.object().keys({
    dtNotificacao: Joi.date()
      .required(),
    ControleLeito: controleLeitos,
  }),
  atualizar: Joi.object().keys({
    dtNotificacao: Joi.date()
      .required(),
    ControleLeito: controleLeitos,
  }),
};
module.exports = schemas;
