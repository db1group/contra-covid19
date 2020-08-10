/* eslint-disable no-restricted-syntax */
const Sequelize = require('sequelize');
const moment = require('moment');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid/v4');
const models = require('../models');

const TIME_ZONE = {
  AMERICA_SAO_PAULO: 'America/Sao_Paulo',
};
const DIRETORIO = 'excel';
const PAIS = { BRASIL: 'Brasil' };

const retornarProfissionalDoNotificador = (notificacao) => {
  const { nomeDaProfissao } = notificacao;

  if (nomeDaProfissao && nomeDaProfissao.trim().length > 0) {
    return nomeDaProfissao;
  }

  const { profissaoDoProfissionalDeSaude } = notificacao;

  if (profissaoDoProfissionalDeSaude && profissaoDoProfissionalDeSaude.trim().length > 0) {
    return profissaoDoProfissionalDeSaude;
  }

  return null;
};

const retornarOutroTelefone = (notificacao) => {
  const { telefoneCelularDoPaciente } = notificacao;
  if (telefoneCelularDoPaciente && telefoneCelularDoPaciente.trim().length > 0) {
    return telefoneCelularDoPaciente;
  }

  const { telefoneContatoDoPaciente } = notificacao;

  if (telefoneContatoDoPaciente && telefoneContatoDoPaciente.trim().length > 0) {
    return telefoneContatoDoPaciente;
  }

  return null;
};

const retornarTipoPeriodoGestacional = (tipoPeriodoGestacional) => {
  switch (tipoPeriodoGestacional) {
    case 'PRIMEIRO_TRIMESTRE':
      return '1º Trimestre';
    case 'SEGUNDO_TRIMESTRE':
      return '2º Trimestre';
    case 'TERCEIRO_TRIMESTRE':
      return '3º Trimestre';
    case 'IDADE_GESTACIONAL_IGNORADA':
      return 'Idade gestacional ignorada';
    default:
      return null;
  }
};

const getDataHora = (data) => (data ? moment(data).tz(TIME_ZONE.AMERICA_SAO_PAULO).format('DD/MM/YYYY HH:mm:ss') : null);
const getData = (data) => (data ? moment(data).tz(TIME_ZONE.AMERICA_SAO_PAULO).format('DD/MM/YYYY') : null);
const getHora = (data) => (data ? moment(data).tz(TIME_ZONE.AMERICA_SAO_PAULO).format('HH:mm') : null);
const getNumber = (value) => (value ? value.toString().replace('.', ',') : null);
const getBoolean = (valor) => (valor ? 'Sim' : 'Não');

const FORMATO_DATA_HORA = 'YYYY-MM-DD HH:mm:ss';

const criarDataInicialParaFiltro = (data) => (data ? moment(data).startOf('day').format(FORMATO_DATA_HORA) : null);

const criarDataFinalParaFiltro = (data) => (data ? moment(data).endOf('day').format(FORMATO_DATA_HORA) : null);

const criarDataInicialHoraParaFiltro = (data) => (data ? moment(data)
  .format(FORMATO_DATA_HORA) : null);

const criarDataFinalHoraParaFiltro = (data) => (data ? moment(data)
  .format(FORMATO_DATA_HORA) : null);

exports.cabecalhosExportacao = [
  { header: 'Data hora da criação da Notificação', key: 'A1' },
  { header: 'Data da Notificação', key: 'A2' },
  { header: 'horaDaNotificacao', key: 'A3' },
  { header: 'usuarioDigitador', key: 'A4' },
  { header: 'statusNotificacao', key: 'A5' },
  { header: 'unidadeNotificante', key: 'A6' },
  { header: 'cNES', key: 'A7' },
  { header: 'nomeDoNotificador', key: 'A8' },
  { header: 'profissaoDoNotificador', key: 'A9' },
  { header: 'situacao1CasoSuspeito', key: 'A10' },
  { header: 'situacao2ContatoDeCasoSuspeitoOuConfirmado', key: 'A11' },
  { header: 'nomeDoPaciente', key: 'A12' },
  { header: 'tipoDocumentoDoPaciente', key: 'A13' },
  { header: 'documentoDoPaciente', key: 'A14' },
  { header: 'sexoDoPaciente', key: 'A15' },
  { header: 'idadeDoPaciente', key: 'A16' },
  { header: 'dataDeNascimentoDoPaciente', key: 'A17' },
  { header: 'gestante', key: 'A18' },
  { header: 'tipoPeriodoGestacional', key: 'A19' },
  { header: 'racaCorDoPaciente', key: 'A20' },
  { header: 'nomeDaMaeDoPaciente', key: 'A21' },
  { header: 'enderecoDoPaciente', key: 'A22' },
  { header: 'numeroDoEnderecoDoPaciente', key: 'A23' },
  { header: 'bairroDoPaciente', key: 'A24' },
  { header: 'municipioDoPaciente', key: 'A25' },
  { header: 'ufDoPaciente', key: 'A26' },
  { header: 'paisDoPaciente', key: 'A27' },
  { header: 'telefoneDoPaciente', key: 'A28' },
  { header: 'outroTelefoneDoPaciente', key: 'A29' },
  { header: 'ocupacaoDoPaciente', key: 'A30' },
  { header: 'tipoOcupacaoDoPaciente', key: 'A31' },
  { header: 'tipoClassificacaoPessoa', key: 'A32' },
  // 4. SINAIS E SINTOMAS'
  // 4.1. SINTOMAS RESPIRATÓRIOS
  { header: 'dataDeInicioDosSintomas', key: 'A33' },
  { header: 'febreAferidaReferida', key: 'A34' },
  { header: 'temperaturaFebre', key: 'A35' },
  { header: 'batimentoAsasNasais', key: 'A36' },
  { header: 'cianoseCentral', key: 'A37' },
  { header: 'congestaoNasal', key: 'A38' },
  { header: 'coriza', key: 'A39' },
  { header: 'dispneia', key: 'A40' },
  { header: 'dorDeGarganta', key: 'A41' },
  { header: 'saturacaoDeOximetriaDePulso', key: 'A42' },
  { header: 'sibilo', key: 'A43' },
  { header: 'taquipneia', key: 'A44' },
  { header: 'tiragemIntercostal', key: 'A45' },
  { header: 'tosse', key: 'A46' },
  { header: 'escarro', key: 'A47' },
  // 4.2 OUTROS SINTOMAS
  { header: 'adinamiaFraqueza', key: 'A48' },
  { header: 'artralgia', key: 'A49' },
  { header: 'calafrios', key: 'A50' },
  { header: 'cefaleia', key: 'A51' },
  { header: 'conjuntivite', key: 'A52' },
  { header: 'diarreia', key: 'A53' },
  { header: 'dificuldadeDeglutir', key: 'A54' },
  { header: 'diminuicaoDePulsoPeriferico', key: 'A55' },
  { header: 'gangliosLinfaticos', key: 'A56' },
  { header: 'irritabilidadeConfusao', key: 'A57' },
  { header: 'manchasVermelhas', key: 'A58' },
  { header: 'mialgia', key: 'A59' },
  { header: 'nauseaVomito', key: 'A60' },
  { header: 'hipotensao', key: 'A61' },
  { header: 'outrosSintomas', key: 'A62' },
  // 5. Realizou exame de imagem
  // Raio de tórax
  { header: 'realizouExameDeImagem', key: 'A63' },
  { header: 'raioXNormal', key: 'A64' },
  { header: 'raioXInfiltrado', key: 'A65' },
  { header: 'raioXConsolidacao', key: 'A66' },
  { header: 'raioXMisto', key: 'A67' },
  { header: 'raioXOutro', key: 'A68' },
  // Tomografia de tórax
  { header: 'tomografiaNormal', key: 'A69' },
  { header: 'tomografiaVidro', key: 'A70' },
  { header: 'tomografiaDerrame', key: 'A71' },
  { header: 'tomografiaLinfonodo', key: 'A72' },
  { header: 'tomografiaOutro', key: 'A73' },
  // 6.Comorbidades Prévias/Fatores de Risco
  { header: 'diabetesMellitus', key: 'A74' },
  { header: 'doencaCardioVascularCronica', key: 'A75' },
  { header: 'doencaHematologicaCronica', key: 'A76' },
  { header: 'doencaHepaticaCronica', key: 'A77' },
  { header: 'doencaNeurologicaCronica', key: 'A78' },
  { header: 'doencaRenalCronica', key: 'A79' },
  { header: 'hipertensao', key: 'A80' },
  { header: 'Imunodecifencia/imunodepressao', key: 'A81' },
  { header: 'infeccaoHIV', key: 'A82' },
  { header: 'neoplasia', key: 'A83' },
  { header: 'obesidade', key: 'A84' },
  { header: 'puerperaAte45DiasDoParto', key: 'A85' },
  { header: 'tabagismo', key: 'A86' },
  { header: 'sindromeDeDown', key: 'A87' },
  { header: 'asma', key: 'A88' },
  { header: 'outraPneumopatiaCronica', key: 'A89' },
  { header: 'outrosComorbidades', key: 'A90' },
  // 7.Usou medicamento
  { header: 'tamiflu', key: 'A91' },
  { header: 'hidroxicloroquina', key: 'A92' },
  { header: 'nomeMedicamento', key: 'A93' },
  // 8. Dados Laboratoriais
  { header: 'coletaMaterialParaDiagnostico', key: 'A94' },
  { header: 'dataDaColeta', key: 'A95' },
  { header: 'tipoLaboratorio', key: 'A96' },
  { header: 'nomeLaboratorioEnvioMaterial', key: 'A97' },
  { header: 'metodoDeExame', key: 'A98' },
  // 9. Histórico de viagem
  { header: 'historicoDeViagem', key: 'A99' },
  { header: 'localDaViagem', key: 'A100' },
  { header: 'dataDaViagem', key: 'A101' },
  // 10. Contato com suspeito
  { header: 'contatoComSuspeito', key: 'A102' },
  { header: 'localDoContatoComSuspeito', key: 'A103' },
  { header: 'nomeSuspeito', key: 'A104' },
  // 12. Outras informações'
  { header: 'recebeuVacinaDaGripeNosUltimosDozeMeses', key: 'A105' },
  { header: 'situacaoNoMomentoDaNotificacao', key: 'A106' },
  { header: 'observacoes', key: 'A107' },
  { header: 'dtSuspeito', key: 'A108' },
  { header: 'dtConfirmado', key: 'A109' },
  { header: 'dtDescartado', key: 'A110' },
  { header: 'dtCurado', key: 'A111' },
  { header: 'dtEncerrado', key: 'A112' },
  { header: 'dtObito', key: 'A113' },
];

const getSQLConsulta = (dataInicial) => {
  const sql = `SELECT "Notificacao"."nomeNotificador" AS nomeDoNotificador,
    "Notificacao"."status" AS statusnotificacao,
    "Notificacao"."createdAt" As criacaoDaNotificacao,
    "Pessoa"."nome" AS "nomeDoPaciente",
    "Pessoa"."dataDeNascimento" AS "dataDeNascimentoDoPaciente",
    "Pessoa"."sexo" AS "sexoDoPaciente",
    "Pessoa"."idade" AS "idadeDoPaciente",
    "Pessoa"."numeroDocumento" AS "numeroDoDocumentoDoPaciente",
    "Pessoa"."tipoDocumento" AS "tipoDocumentoDoPaciente",
    "Pessoa"."nomeDaMae" AS "nomeDaMaeDoPaciente",
    "Pessoa"."ocupacao" AS "ocupacaoDoPaciente",
    "Pessoa"."endereco" AS "enderecoDoPaciente",
    "Pessoa"."numero" AS "numeroDoEnderecoDoPaciente",
    "Pessoa"."telefoneResidencial" AS "telefoneResidencialDoPaciente",
    "Pessoa"."telefoneCelular" AS "telefoneCelularDoPaciente",
    "Pessoa"."telefoneContato" AS "telefoneContatoDoPaciente",
    "Pessoa"."gestante" AS "pacienteGestante",
    "Pessoa"."racaCor" AS "racaCorDoPaciente",
    "Pessoa"."tipoClassificacaoPessoa" AS "tipoClassificacaoDoPaciente",
    "Pessoa"."tipoPeriodoGestacional" AS "tipoPeriodoGestacionalDoPaciente",
    "Bairro"."nome" AS "bairroDoPaciente",
    "Ocupacao"."descricao" AS "tipoOcupacaoDoPaciente",
    "Municipio"."nome" AS "municipioDoPaciente",
    "Municipio"."uf" AS "uFDoMunicipioDoPaciente",
    "NotificacaoCovid19"."dataInicioDosSintomas",
    "NotificacaoCovid19"."dataHoraNotificacao",
    "NotificacaoCovid19"."coriza",
    "NotificacaoCovid19"."tosse",
    "NotificacaoCovid19"."dorDeGarganta",
    "NotificacaoCovid19"."mialgia",
    "NotificacaoCovid19"."escarro",
    "NotificacaoCovid19"."sibilo",
    "NotificacaoCovid19"."batimentoAsasNasais",
    "NotificacaoCovid19"."dispneia",
    "NotificacaoCovid19"."taquipneia",
    "NotificacaoCovid19"."tiragemIntercostal",
    "NotificacaoCovid19"."saturacaoDeOximetriaDePulso",
    "NotificacaoCovid19"."cianoseCentral",
    "NotificacaoCovid19"."febreAferidaReferida",
    "NotificacaoCovid19"."temperaturaFebre",
    "NotificacaoCovid19"."congestaoNasal",
    "NotificacaoCovid19"."diminuicaoDePulsoPeriferico",
    "NotificacaoCovid19"."hipotensao",
    "NotificacaoCovid19"."diarreia",
    "NotificacaoCovid19"."adinamiaFraqueza",
    "NotificacaoCovid19"."artralgia",
    "NotificacaoCovid19"."calafrios",
    "NotificacaoCovid19"."conjuntivite",
    "NotificacaoCovid19"."dificuldadeDeglutir",
    "NotificacaoCovid19"."gangliosLinfaticos",
    "NotificacaoCovid19"."irritabilidadeConfusao",
    "NotificacaoCovid19"."manchasVermelhas",
    "NotificacaoCovid19"."cefaleia",
    "NotificacaoCovid19"."nauseaVomito",
    "NotificacaoCovid19"."outrosSintomas",
    "NotificacaoCovid19"."puerperaAte45DiasDoParto",
    "NotificacaoCovid19"."sindromeDeDown",
    "NotificacaoCovid19"."diabetesMellitus",
    "NotificacaoCovid19"."imunodeficiencia",
    "NotificacaoCovid19"."doencaCardioVascularCronica",
    "NotificacaoCovid19"."doencaHepaticaCronica",
    "NotificacaoCovid19"."doencaNeurologicaCronica",
    "NotificacaoCovid19"."doencaRenalCronica",
    "NotificacaoCovid19"."doencaHematologicaCronica",
    "NotificacaoCovid19"."asma",
    "NotificacaoCovid19"."hipertensao",
    "NotificacaoCovid19"."infeccaoHIV",
    "NotificacaoCovid19"."neoplasia",
    "NotificacaoCovid19"."tabagismo",
    "NotificacaoCovid19"."outraPneumopatiaCronica",
    "NotificacaoCovid19"."obesidade",
    "NotificacaoCovid19"."outrosComorbidades",
    "NotificacaoCovid19"."tamiflu",
    "NotificacaoCovid19"."hidroxicloroquina",
    "NotificacaoCovid19"."nomeMedicamento",
    "NotificacaoCovid19"."historicoDeViagem",
    "NotificacaoCovid19"."dataDaViagem",
    "NotificacaoCovid19"."localDaViagem",
    "NotificacaoCovid19"."recebeuVacinaDaGripeNosUltimosDozeMeses",
    "NotificacaoCovid19"."situacao1",
    "NotificacaoCovid19"."situacao2",
    "NotificacaoCovid19"."coletaMaterialParaDiagnostico",
    "NotificacaoCovid19"."tipoLaboratorio",
    "NotificacaoCovid19"."nomeLaboratorioEnvioMaterial",
    "NotificacaoCovid19"."dataDaColeta",
    "NotificacaoCovid19"."metodoDeExame",
    "NotificacaoCovid19"."realizouExameDeImagem",
    "NotificacaoCovid19"."raioXNormal",
    "NotificacaoCovid19"."raioXInfiltrado",
    "NotificacaoCovid19"."raioXConsolidacao",
    "NotificacaoCovid19"."raioXMisto",
    "NotificacaoCovid19"."raioXOutro",
    "NotificacaoCovid19"."tomografiaNormal",
    "NotificacaoCovid19"."tomografiaVitro",
    "NotificacaoCovid19"."tomografiaDerrame",
    "NotificacaoCovid19"."tomografiaLinfonodo",
    "NotificacaoCovid19"."tomografiaOutro",
    "NotificacaoCovid19"."observacoes",
    "NotificacaoCovid19"."contatoComSuspeito",
    "NotificacaoCovid19"."localDoContatoComSuspeito",
    "NotificacaoCovid19"."nomeSuspeito",
    "NotificacaoCovid19"."situacaoNoMomentoDaNotificacao",
    "UnidadeSaude"."nome" AS "unidadeNotificante",
    "UnidadeSaude"."cnes" AS "cnesDaUnidadeNotificante",
    "Profissao"."nome" AS "nomeDaProfissao",
    "ProfissionalSaude"."profissao" AS "profissaoDoProfissionalDeSaude",
    "User"."email" AS "usuarioDigitador",
    "Notificacao"."dtSuspeito",
    "Notificacao"."dtConfirmado",
    "Notificacao"."dtDescartado",
    "Notificacao"."dtCurado",
    "Notificacao"."dtEncerrado",
    "Notificacao"."dtObito"
  FROM "Notificacao"
  INNER JOIN "Pessoa" ON "Notificacao"."pessoaId" = "Pessoa"."id"
  INNER JOIN "Bairro" ON "Pessoa"."bairroId" = "Bairro"."id"
  INNER JOIN "Ocupacao" ON "Pessoa"."ocupacaoId" = "Ocupacao"."id"
  INNER JOIN "Municipio" ON "Pessoa"."municipioId" = "Municipio"."id"
  INNER JOIN "NotificacaoCovid19" ON "Notificacao"."id" = "NotificacaoCovid19"."notificacaoId"
  INNER JOIN "UnidadeSaude" ON "Notificacao"."unidadeSaudeId" = "UnidadeSaude"."id"
  INNER JOIN "User" ON "Notificacao"."userId" = "User"."id"
  LEFT JOIN "ProfissionalSaude" ON "Notificacao"."notificadorId" = "ProfissionalSaude"."id"
  LEFT JOIN "Profissao" ON "Notificacao"."profissaoId" = "Profissao"."id"
  WHERE "Notificacao"."status" != 'EXCLUIDA' AND "Notificacao"."municipioId" = :tenant
  AND #FILTRODATA
  ORDER BY "Notificacao"."createdAt" DESC`;
  if (dataInicial) {
    return sql.replace('#FILTRODATA', '"Notificacao"."createdAt" BETWEEN :dtInicial AND :dtFinal');
  }
  return sql.replace('#FILTRODATA', `EXISTS (SELECT 1 FROM "NotificacaoEvolucao" ne WHERE ne."notificacaoId" = "Notificacao"."id"
    AND ne."createdAt" BETWEEN :dtInicial AND :dtFinal)`);
};

exports.consultarNotificacoes = (
  dataInicial, dataFinal, dataEvolucaoInicial, dataEvolucaoFinal, tenant,
) => {
  const dtInicial = dataInicial || dataEvolucaoInicial;
  const dtFinal = dataFinal || dataEvolucaoFinal;

  return models.sequelize.query(
    getSQLConsulta(dataInicial),
    {
      replacements: {
        dtInicial, dtFinal, tenant,
      },
    },
    { type: Sequelize.QueryTypes.SELECT },
  );
};

exports.retornarRowsNotificacaoExcel = (notificacoes) => notificacoes.map((notificacao) => ({
  A1: getDataHora(notificacao.criacaodanotificacao),
  A2: getData(notificacao.dataHoraNotificacao),
  A3: getHora(notificacao.dataHoraNotificacao),
  A4: notificacao.usuarioDigitador,
  A5: notificacao.statusnotificacao,
  A6: notificacao.unidadeNotificante,
  A7: notificacao.cnesDaUnidadeNotificante,
  A8: notificacao.nomedonotificador,
  A9: retornarProfissionalDoNotificador(notificacao),
  A10: getBoolean(notificacao.situacao1),
  A11: getBoolean(notificacao.situacao2),
  A12: notificacao.nomeDoPaciente,
  A13: notificacao.tipoDocumentoDoPaciente,
  A14: notificacao.numeroDoDocumentoDoPaciente,
  A15: notificacao.sexoDoPaciente,
  A16: notificacao.idadeDoPaciente,
  A17: getData(notificacao.dataDeNascimentoDoPaciente),
  A18: notificacao.pacienteGestante,
  A19: retornarTipoPeriodoGestacional(notificacao.tipoPeriodoGestacionalDoPaciente),
  A20: notificacao.racaCorDoPaciente,
  A21: notificacao.nomeDaMaeDoPaciente,
  A22: notificacao.enderecoDoPaciente,
  A23: notificacao.numeroDoEnderecoDoPaciente,
  A24: notificacao.bairroDoPaciente,
  A25: notificacao.municipioDoPaciente,
  A26: notificacao.uFDoMunicipioDoPaciente,
  A27: PAIS.BRASIL,
  A28: notificacao.telefoneResidencialDoPaciente,
  A29: retornarOutroTelefone(notificacao),
  A30: notificacao.ocupacaoDoPaciente,
  A31: notificacao.tipoOcupacaoDoPaciente,
  A32: notificacao.tipoClassificacaoDoPaciente,
  A33: getData(notificacao.dataInicioDosSintomas),
  A34: getBoolean(notificacao.febreAferidaReferida),
  A35: getNumber(notificacao.temperaturaFebre),
  A36: getBoolean(notificacao.batimentoAsasNasais),
  A37: getBoolean(notificacao.cianoseCentral),
  A38: getBoolean(notificacao.congestaoNasal),
  A39: getBoolean(notificacao.coriza),
  A40: getBoolean(notificacao.dispneia),
  A41: getBoolean(notificacao.dorDeGarganta),
  A42: getBoolean(notificacao.saturacaoDeOximetriaDePulso),
  A43: getBoolean(notificacao.sibilo),
  A44: getBoolean(notificacao.taquipneia),
  A45: getBoolean(notificacao.tiragemIntercostal),
  A46: getBoolean(notificacao.tosse),
  A47: getBoolean(notificacao.escarro),
  A48: getBoolean(notificacao.adinamiaFraqueza),
  A49: getBoolean(notificacao.artralgia),
  A50: getBoolean(notificacao.calafrios),
  A51: getBoolean(notificacao.cefaleia),
  A52: getBoolean(notificacao.conjuntivite),
  A53: getBoolean(notificacao.diarreia),
  A54: getBoolean(notificacao.dificuldadeDeglutir),
  A55: getBoolean(notificacao.diminuicaoDePulsoPeriferico),
  A56: getBoolean(notificacao.gangliosLinfaticos),
  A57: getBoolean(notificacao.irritabilidadeConfusao),
  A58: getBoolean(notificacao.manchasVermelhas),
  A59: getBoolean(notificacao.mialgia),
  A60: getBoolean(notificacao.nauseaVomito),
  A61: getBoolean(notificacao.hipotensao),
  A62: notificacao.outrosSintomas,
  A63: getBoolean(notificacao.realizouExameDeImagem),
  A64: getBoolean(notificacao.raioXNormal),
  A65: getBoolean(notificacao.raioXInfiltrado),
  A66: getBoolean(notificacao.raioXConsolidacao),
  A67: getBoolean(notificacao.raioXMisto),
  A68: notificacao.raioXOutro,
  A69: getBoolean(notificacao.tomografiaNormal),
  A70: getBoolean(notificacao.tomografiaVitro),
  A71: getBoolean(notificacao.tomografiaDerrame),
  A72: getBoolean(notificacao.tomografiaLinfonodo),
  A73: notificacao.tomografiaOutro,
  A74: getBoolean(notificacao.diabetesMellitus),
  A75: getBoolean(notificacao.doencaCardioVascularCronica),
  A76: getBoolean(notificacao.doencaHematologicaCronica),
  A77: getBoolean(notificacao.doencaHepaticaCronica),
  A78: getBoolean(notificacao.doencaNeurologicaCronica),
  A79: getBoolean(notificacao.doencaNeurologicaCronica),
  A80: getBoolean(notificacao.hipertensao),
  A81: getBoolean(notificacao.imunodeficiencia),
  A82: getBoolean(notificacao.infeccaoHIV),
  A83: getBoolean(notificacao.neoplasia),
  A84: getBoolean(notificacao.obesidade),
  A85: getBoolean(notificacao.puerperaAte45DiasDoParto),
  A86: getBoolean(notificacao.tabagismo),
  A87: getBoolean(notificacao.sindromeDeDown),
  A88: getBoolean(notificacao.asma),
  A89: getBoolean(notificacao.outraPneumopatiaCronica),
  A90: notificacao.outrosComorbidades,
  A91: getBoolean(notificacao.tamiflu),
  A92: getBoolean(notificacao.hidroxicloroquina),
  A93: notificacao.nomeMedicamento,
  A94: getBoolean(notificacao.coletaMaterialParaDiagnostico),
  A95: getData(notificacao.dataDaColeta),
  A96: notificacao.tipoLaboratorio,
  A97: notificacao.nomeLaboratorioEnvioMaterial,
  A98: notificacao.metodoDeExame,
  A99: getBoolean(notificacao.historicoDeViagem),
  A100: notificacao.localDaViagem,
  A101: getData(notificacao.dataDaViagem),
  A102: notificacao.contatoComSuspeito,
  A103: notificacao.localDoContatoComSuspeito,
  A104: notificacao.nomeSuspeito,
  A105: notificacao.recebeuVacinaDaGripeNosUltimosDozeMeses,
  A106: notificacao.situacaoNoMomentoDaNotificacao,
  A107: notificacao.observacoes,
  A108: getData(notificacao.dtSuspeito),
  A109: getData(notificacao.dtConfirmado),
  A110: getData(notificacao.dtDescartado),
  A111: getData(notificacao.dtCurado),
  A112: getData(notificacao.dtEncerrado),
  A113: getData(notificacao.dtObito),
}));

exports.retornarFiltrosData = ({
  dataInicial, dataFinal, dataEvolucaoInicial, dataEvolucaoFinal,
}) => {
  const dataInicialFiltro = criarDataInicialParaFiltro(dataInicial);
  const dataFinalFiltro = criarDataFinalParaFiltro(dataFinal);
  const dataEvolucaoInicialFiltro = criarDataInicialHoraParaFiltro(dataEvolucaoInicial);
  const dataEvolucaoFinalFiltro = criarDataFinalHoraParaFiltro(dataEvolucaoFinal);
  return [dataInicialFiltro, dataFinalFiltro, dataEvolucaoInicialFiltro, dataEvolucaoFinalFiltro];
};

exports.generateFileName = (extName = 'xlsx') => {
  if (!fs.existsSync(DIRETORIO)) {
    fs.mkdirSync(DIRETORIO);
  }

  const filename = `${uuid()}.${extName}`;
  const fullPath = path.resolve(DIRETORIO, filename);
  return { fullPath, filename };
};
