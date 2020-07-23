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
    nomeDoCaso: Joi.string().allow('', null).max(150),
    descricaoLocal: Joi.string().allow('', null).max(255),
    observacoes: Joi.string().allow('', null),
    suspeito: Joi.object().keys({
      numeroDocumento: Joi.string()
        .allow('', null),
      bairroId: Joi.string().guid({ version: 'uuidv4' }).required(),
      ocupacaoId: Joi.string().guid({ version: 'uuidv4' }).required(),
      municipioId: Joi.string().guid({ version: 'uuidv4' }).required(),
      pessoaId: Joi.string().guid({ version: 'uuidv4' }).allow(null),
      tipoDocumento: Joi.string()
        .pattern(/CPF|RG|CNH|SUS/),
      nome: Joi.string()
        .min(3)
        .max(150)
        .required(),
      dataDeNascimento: Joi.date().iso().required(),
      sexo: Joi.string()
        .pattern(/F|M/)
        .required(),
      cep: Joi.string()
        .allow(null, '')
        .length(8),
      nomeDaMae: Joi.string()
        .min(3)
        .max(150)
        .required(),
      ocupacao: Joi.string()
        .allow(null, '')
        .min(3)
        .max(60),
      endereco: Joi.string()
        .min(3)
        .max(150)
        .required(),
      numero: Joi.string()
        .min(2)
        .max(12)
        .required(),
      complemento: Joi.string()
        .allow(null, '')
        .min(3)
        .max(150),
      telefoneResidencial: Joi.string()
        .label('Telefone residencial')
        .allow(null, '')
        .min(10)
        .max(11),
      telefoneContato: Joi.string()
        .label('Telefone contato')
        .allow(null, '')
        .min(10)
        .max(11),
      telefoneCelular: Joi.string()
        .label('Telefone celular')
        .allow(null, '')
        .min(11)
        .max(11),
      gestante: Joi.string()
        .pattern(/SIM|NAO|NAO_APLICADO/)
        .required(),
      tipoPeriodoGestacional: Joi.string()
        .pattern(/PRIMEIRO_TRIMESTRE|SEGUNDO_TRIMESTRE|TERCEIRO_TRIMESTRE|IDADE_GESTACIONAL_IGNORADA/)
        .allow(null, ''),
      gestanteAltoRisco: Joi.bool()
        .allow(null),
      racaCor: Joi.string()
        .pattern(/BRANCA|PRETA|AMARELA|PARDA|INDIGENA|IGNORADO/)
        .required(),
      tipoClassificacaoPessoa: Joi.string()
        .pattern(/CRIANCA_ATE_12_ANOS|EM_SITUACAO_RUA|ESTRANGEIRO|INDIGENA|OUTRO|PRIVADO_LIBERDADE/)
        .required(),
      uf: Joi.string()
        .allow(null, '')
        .length(2),
      passaporte: Joi.string()
        .allow(null, '')
        .max(20),
      paisId: [Joi.string().required(), Joi.number().required()],
    }),
    sintomas: Joi.object().keys({
      febreAferidaReferida: Joi.bool()
        .allow(null),
      temperaturaFebre: Joi.number()
        .allow(null),
      adinamiaFraqueza: Joi.bool()
        .allow(null),
      artralgia: Joi.bool()
        .allow(null),
      calafrios: Joi.bool()
        .allow(null),
      conjuntivite: Joi.bool()
        .allow(null),
      coriza: Joi.bool()
        .allow(null),
      congestaoNasal: Joi.bool()
        .allow(null),
      dificuldadeDeglutir: Joi.bool()
        .allow(null),
      gangliosLinfaticos: Joi.bool()
        .allow(null),
      irritabilidadeOuConfusao: Joi.bool()
        .allow(null),
      manchasVermelhas: Joi.bool()
        .allow(null),
      tosse: Joi.bool()
        .allow(null),
      dorDeGarganta: Joi.bool()
        .allow(null),
      mialgia: Joi.bool()
        .allow(null),
      escarro: Joi.bool()
        .allow(null),
      sibilo: Joi.bool()
        .allow(null),
      batimentoAsasNasais: Joi.bool()
        .allow(null),
      dispneia: Joi.bool()
        .allow(null),
      taquipneia: Joi.bool()
        .allow(null),
      saturacaoDeOximetriaDePulso: Joi.bool()
        .allow(null),
      cianoseCentral: Joi.bool()
        .allow(null),
      diminuicaoDePulsoPeriferico: Joi.bool()
        .allow(null),
      hipotensao: Joi.bool()
        .allow(null),
      diarreia: Joi.bool()
        .allow(null),
      cefaleia: Joi.bool()
        .allow(null),
      nauseaVomito: Joi.bool()
        .allow(null),
      perdaOlfatoPaladar: Joi.bool()
        .allow(null),
      tiragemIntercostal: Joi.bool()
        .allow(null),
      outros: Joi.string()
        .allow(null, ''),
      existemOutrosSintomas: Joi.bool()
        .allow(null),
    }),

    comorbidades: Joi.object().keys({
      puerperaAte45DiasDoParto: Joi.bool()
        .allow(null),
      sindromeDeDown: Joi.bool()
        .allow(null),
      diabetesMellitus: Joi.bool()
        .allow(null),
      imunodeficiencia: Joi.bool()
        .allow(null),
      doencaCardioVascularCronica: Joi.bool()
        .allow(null),
      doencaHepaticaCronica: Joi.bool()
        .allow(null),
      doencaNeurologicaCronica: Joi.bool()
        .allow(null),
      doencaRenalCronica: Joi.bool()
        .allow(null),
      doencaHematologicaCronica: Joi.bool()
        .allow(null),
      asma: Joi.bool()
        .allow(null),
      outraPneumopatiaCronica: Joi.bool()
        .allow(null),
      obesidade: Joi.bool()
        .allow(null),
      hipertensao: Joi.bool()
        .allow(null),
      infeccaoHIV: Joi.bool()
        .allow(null),
      neoplasia: Joi.bool()
        .allow(null),
      tabagismo: Joi.bool()
        .allow(null),
      doencaPulmonar: Joi.bool()
        .allow(null),
      outros: Joi.string()
        .allow(null),
      outrasComorbidades: Joi.bool()
        .allow(null),
    }),
    examesImagem: Joi.object().keys({
      raioNormal: Joi.bool(),
      raioInfiltradoIntersticial: Joi.bool().allow(null),
      raioConsolidacao: Joi.bool().allow(null),
      raioMisto: Joi.bool().allow(null),
      raioOutro: Joi.string()
        .allow(null, '')
        .min(3)
        .max(255),
      tomografiaNormal: Joi.bool()
        .allow(null),
      tomografiaVidroFoscoPredominioPerifericoBasal: Joi.bool().allow(null),
      tomografiaAusenciaDerramePleural: Joi.bool().allow(null),
      tomografiaAusenciaLinfonodoMediastenal: Joi.bool().allow(null),
      tomografiaOutro: Joi.string()
        .allow(null, '')
        .min(3)
        .max(255),
    }),
    informacaoComplementar: Joi.object().keys({
      tamiflu: Joi.bool(),
      hidroxicloroquina: Joi.bool(),
      cloroquina: Joi.bool(),
      nomeMedicamento: Joi.string()
        .allow('', null)
        .max(120),
      historicoDeViagem: Joi.bool(),
      dataDaViagem: Joi.date()
        .iso()
        .max('now')
        .message('Data da viagem deve ser menor ou igual de hoje.')
        .allow(null, ''),
      localDaViagem: Joi.string()
        .allow('', null)
        .max(255),
      recebeuVacinaDaGripeNosUltimosDozeMeses: Joi.string().allow(null, '')
        .pattern(/SIM|NAO|NAO_SABE/),
      dataRetornoLocal: Joi.date()
        .iso()
        .max('now')
        .message('Data do retorno deve ser menor ou igual de hoje.')
        .allow(null, ''),
      dataChegadaBrasil: Joi.date()
        .iso()
        .max('now')
        .message('Data de chegada no Brasil deve ser menor ou igual de hoje.')
        .allow(null, ''),
      dataChegadaUF: Joi.date()
        .iso()
        .max('now')
        .message('Data de chegada no estado deve ser menor ou igual de hoje.')
        .allow(null, ''),
      descritivoViagem: Joi.string()
        .allow('', null)
        .max(255),
    }),
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
        .pattern(/RT-PCR|TESTE_RAPIDO|SOROLOGIA_OUTROS|ELISA|QUIMIOLUMINESCENCIA|IMUNOFLUORESCENCIA/),
    }),
    hospitalizacao: Joi.object().keys({
      hospitalizado: Joi.bool().allow(null),
      cnesHospitalId: Joi.string().guid({ version: 'uuidv4' }).allow(null),
      nomeHospital: Joi.string().allow(null, ''),
      internacaoSus: Joi.bool().allow(null),
      tipoLeito: Joi.string().allow(null, ''),
      dataInternamento: Joi.date().iso().allow(null),
      dataIsolamento: Joi.date().iso().allow(null),
      dataAlta: Joi.date().iso().allow(null),
    }),
  }),
};
module.exports = schemas;
