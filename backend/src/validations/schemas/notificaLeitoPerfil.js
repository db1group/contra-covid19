const Joi = require('@hapi/joi');

const TAMANHO_CAMPO_CAUSA = 150;

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
  consultarPorLeito: Joi.object().keys({
    notificaLeitoId: Joi.string().guid({ version: 'uuidv4' }),
  }),
  consultar: Joi.object().keys({
    page: Joi.number().greater(0),
    itemsPerPage: Joi.number().greater(0).max(100),
    search: Joi.string().max(TAMANHO_CAMPO_CAUSA).allow(''),
  }),
  consultarId: Joi.object().keys({
    notificaLeitoId: Joi.string().guid({ version: 'uuidv4' }),
    id: Joi.string().guid({ version: 'uuidv4' }),
  }),
  salvar: Joi.object().keys({
    perfilId: Joi.string().guid({ version: 'uuidv4' }),
    perfilNome: Joi.string().max(TAMANHO_CAMPO_CAUSA).allow(''),
    causa: Joi.string().max(TAMANHO_CAMPO_CAUSA).required(),
    ControleLeito: controleLeitos,
  }).xor('perfilId', 'perfilNome'),
};
module.exports = schemas;
