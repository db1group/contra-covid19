const Joi = require('@hapi/joi');

const schemas = {
  cadastrar: Joi.object().keys({
    dataHoraNotificacao: Joi.date().iso().required(),
    unidadeSaudeId: Joi.string().guid({ version: 'uuidv4' }).required(),
    notificadorId: Joi.string().guid({ version: 'uuidv4' }).required(),
    sintomatico: Joi.bool().required(),
    realizouExamesImagem: Joi.bool(),
    dataInicioDosSintomas: Joi.date().iso().allow(null),
    userId: Joi.string().guid({ version: 'uuidv4' }).required(),
    nomeNotificador: Joi.string().required().min(3).max(80),
    profissaoId: Joi.string().guid({ version: 'uuidv4' }).required(),
    tipoDeContatoComCaso: Joi.string()
      .allow('', null)
      .pattern(/SUSPEITO|CONFIRMADO|SEM_CONTATO/),
    tipoDeLocalDoCaso: Joi.string()
      .allow('', null)
      .pattern(/DOMICILIO|UNIDADE_SAUDE|LOCAL_TRABALHO/),
    nomeDoCaso: Joi.string().allow('', null).max(120),
    observacoes: Joi.string().allow('', null),
    suspeito: Joi.object(),
    sintomas: Joi.object(),
    comorbidades: Joi.object(),
    examesImagem: Joi.object(),
    informacaoComplementar: Joi.object(),
    vinculoEpidemiologico: Joi.object().keys({
      situacao1: Joi.bool().allow(null),
      situacao2: Joi.bool().allow(null),
      nome: Joi.string().allow(null, '').min(3).max(120),
    }),
    conclusaoAtendimento: Joi.object().keys({
      situacaoNoMomentoDaNotificacao: Joi.string()
        .pattern(/ALTA_ISOLAMENTO_DOMICILIAR|INTERNAMENTO_LEITO_COMUM|INTERNAMENTO_LEITO_UTI|EVOLUCAO_OBITO/),
      coletaMaterialParaDiagnostico: Joi.bool().allow(null),
      tipoLaboratorio: Joi.string()
        .allow(null)
        .pattern(/OFICIAL|PRIVADO/),
      nomeLaboratorioEnvioMaterial: Joi.string().allow(null, ''),
      dataDaColeta: Joi.date().iso().allow(null),
      metodoDeExame: Joi.string().allow(null)
        .pattern(/RT-PCR|TESTE_RAPIDO|SOROLOGIA_OUTROS/),
    }),
  }),
};
module.exports = schemas;
