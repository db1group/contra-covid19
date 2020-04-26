const Joi = require('@hapi/joi');

const schemas = {
  cadastrar: Joi.object().keys({
    // userId: Joi.string().guid({ version: 'uuidv4' }).required(),
    // unidadeSaudeId: Joi.string().guid({ version: 'uuidv4' }).required(),
    // notificadorId: Joi.string().guid({ version: 'uuidv4' }).required(),
    // profissaoId: Joi.string().guid({ version: 'uuidv4' }).required(),
    // dataHoraNotificacao: Joi.date().iso(),
    // sintomatico: Joi.bool(),
    // dataInicioDosSintomas: Joi.date().iso(),
    nomeNotificador: Joi.string().required().min(3).max(80),
    // observacoes: Joi.string(),
    // suspeito: Joi.object(),
    // sintomas: Joi.object(),
    // comorbidades: Joi.object(),
    // informacaoComplementar: Joi.object(),
    // vinculoEpidemiologico: Joi.object(),
    // conclusaoAtendimento: Joi.object(),
    // status: Joi.string()
    //   .pattern(/ABERTA|ENCERRADA|EXCLUIDA/)
    //   .required(),
  }),
};
module.exports = schemas;
