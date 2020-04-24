const Joi = require('@hapi/joi');

const schemas = {
  cadastrar: Joi.object().keys({
    nome: Joi.string().min(3).max(150).required(),
    dataDeNascimento: Joi.date().iso(),
    sexo: Joi.string().regex(/M|F/),
    idade: Joi.number().integer().min(1).max(123),
    numeroDocumento: Joi.string()
      .pattern(/^[0-9]{3,18}$/)
      .required(),
    tipoDocumento: Joi.string()
      .pattern(/CPF|RG|CNH|SUS/)
      .required(),
    nomeDaMae: Joi.string().max(150),
    ocupacao: Joi.string().max(60),
    endereco: Joi.string().max(150),
    numero: Joi.string().max(18),
    bairroId: Joi.string().guid({ version: 'uuidv4' }),
    municicpioId: Joi.string().guid({ version: 'uuidv4' }),
    telefoneResidencial: Joi.string().max(18),
    telefoneContato: Joi.string().max(18),
    telefoneCelular: Joi.string().max(18),
  }),
  consultarId: Joi.object().keys({
    id: Joi.string().guid({ version: 'uuidv4' }),
  }),
  consultarCPF: Joi.object().keys({
    numeroDocumento: Joi.string()
      .pattern(/^[0-9]{3,18}$/)
      .required(),
    tipoDocumento: Joi.string()
      .pattern(/CPF|RG|CNH|SUS/)
      .required(),
  }),
};
module.exports = schemas;
