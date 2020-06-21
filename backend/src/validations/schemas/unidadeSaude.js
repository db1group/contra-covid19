const Joi = require('@hapi/joi');

const schemas = {
  cadastrar: Joi.object().keys({
    nome: Joi.string().min(3).max(150).required(),
    municipioId: Joi.string()
      .guid({ version: 'uuidv4' })
      .required(),
    cnes: Joi.string()
      .pattern(/^[0-9]+$/)
      .required(),
    qtEnfermariaCovid: Joi.string()
      .pattern(/^[0-9]+$/)
      .required(),
    qtUTIAdultaCovid: Joi.string()
      .pattern(/^[0-9]+$/)
      .required(),
    qtUTIPedCovid: Joi.string()
      .pattern(/^[0-9]+$/)
      .required(),
    qtUTINeoCovid: Joi.string()
      .pattern(/^[0-9]+$/)
      .required(),
    qtEnfermariaNormal: Joi.string()
      .pattern(/^[0-9]+$/)
      .required(),
    qtUTIAdultaNormal: Joi.string()
      .pattern(/^[0-9]+$/)
      .required(),
    qtUTIPedNormal: Joi.string()
      .pattern(/^[0-9]+$/)
      .required(),
    qtUTINeoNormal: Joi.string()
      .pattern(/^[0-9]+$/)
      .required(),
    qtEnfermariaPrivado: Joi.string()
      .pattern(/^[0-9]+$/)
      .required(),
    qtUTIAdultaPrivado: Joi.string()
      .pattern(/^[0-9]+$/)
      .required(),
    qtUTIPedPrivado: Joi.string()
      .pattern(/^[0-9]+$/)
      .required(),
    qtUTINeoPrivado: Joi.string()
      .pattern(/^[0-9]+$/)
      .required(),
  }),
};
module.exports = schemas;
