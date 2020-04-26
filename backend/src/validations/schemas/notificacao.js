const Joi = require('@hapi/joi');

const schemas = {
  cadastrar: Joi.object().keys({
    dataHoraNotificacao: Joi.date().iso().required(),
    unidadeSaudeId: Joi.string().guid({ version: 'uuidv4' }).required(),
    notificadorId: Joi.string().guid({ version: 'uuidv4' }).required(),
    sintomatico: Joi.bool().required(),
    realizouExamesImagem: Joi.bool(),
    dataInicioDosSintomas: Joi.date().iso(),
    userId: Joi.string().guid({ version: 'uuidv4' }).required(),
    nomeNotificador: Joi.string().required().min(3).max(80),
    profissaoId: Joi.string().guid({ version: 'uuidv4' }).required(),
    tipoDeContatoComCaso: Joi.string().allow(''),
    tipoDeLocalDoCaso: Joi.string().allow(''),
    descricaoDoLocalDoCaso: Joi.string().allow(''),
    nomeDoCaso: Joi.string().allow(''),
    // observacoes: Joi.string(),
    // suspeito: Joi.object(),
    // sintomas: Joi.object(),
    // comorbidades: Joi.object(),
    // examesImagem: Joi.object(),
    // informacaoComplementar: Joi.object(),
    // vinculoEpidemiologico: Joi.object(),
    // conclusaoAtendimento: Joi.object(),
  }),
};
module.exports = schemas;
