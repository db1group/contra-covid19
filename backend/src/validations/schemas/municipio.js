const Joi = require('@hapi/joi');

const schemas = {
  consultarBairrosDoMunicipio: Joi.object().keys({
    municipioId: Joi.string().guid({ version: 'uuidv4' }).required(),
  }),
};
module.exports = schemas;
