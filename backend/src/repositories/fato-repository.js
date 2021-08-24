/* eslint-disable no-param-reassign */
const Sequelize = require('sequelize');
const moment = require('moment');
const models = require('../models');
const sexoEnum = require('../enums/sexo-enum');
const notificacaoRepository = require('./notificacao-repository');
const tipoLocalEnum = require('../enums/tipo-local-evolucao-enum');
const tipoEvolucaoEnum = require('../enums/tipo-notificacao-evolucao-enum');

const FAIXA_ETARIA_PADRAO = '14 A 59';
const BAIRRO_GERAL = 'GERAL';
const PAIS_BRASIL = 'BRASIL';
const MASCARA_DATA = 'YYYY-MM-DD';

const FATO_PADRAO = {
  qtsuspeito: 0,
  qtsuspeitoisolamento: 0,
  qtsuspeitoregular: 0,
  qtsuspeitouti: 0,
  qtencerrado: 0,
  qtconfirmado: 0,
  qtconfirmadoisolamento: 0,
  qtconfirmadoregular: 0,
  qtconfirmadouti: 0,
  qtrecuperado: 0,
  qtobito: 0,
  qtdescartado: 0,
};

const definirDimensaoPacienteId = async (transaction,
  { sexo, faixaetaria, comorbidade = false }) => {
  let paciente = await models.DmPaciente.findOne({
    attributes: ['id'],
    where: {
      sexo,
      faixaetaria,
      comorbidade,
    },
  });
  if (!paciente) {
    paciente = await models.DmPaciente.create({
      sexo,
      faixaetaria,
      comorbidade,
    }, { transaction });
  }
  return paciente.id;
};

const definirDimensaoPacienteDefault = async (transaction) => definirDimensaoPacienteId(
  transaction, { sexo: sexoEnum.values.Masculino, faixaetaria: FAIXA_ETARIA_PADRAO },
);

const definirDimensaoLocalizacaoId = async (tenantConfig, transaction, bairro) => {
  let [localizacao] = await models.sequelize.query(`
  select m.nome, m.uf, dl.id from "Municipio" m
  left outer join "DmLocalizacao" dl on dl.cidade = m.nome and dl.estado = m.uf
  and dl.bairro = :geral and dl.pais = :pais
  where m.id = :municipioId limit 1`,
  {
    replacements: { geral: bairro, pais: PAIS_BRASIL, municipioId: tenantConfig.municipioId },
    type: Sequelize.QueryTypes.SELECT,
  });
  if (!localizacao.id) {
    localizacao = await models.DmLocalizacao.create({
      bairro,
      cidade: localizacao.nome,
      estado: localizacao.uf,
      pais: PAIS_BRASIL,
    }, { transaction });
  }
  return localizacao.id;
};

const definirDimensaoLocalizacaoDefault = async (
  tenantConfig, transaction) => definirDimensaoLocalizacaoId(
  tenantConfig, transaction, BAIRRO_GERAL,
);

const deleteByData = async (tenant, dataFato, transaction) => models.FatoNotificacaoCovid19
  .destroy({ where: { municipioId: tenant, dtfato: dataFato } }, { transaction });

const gerarFatoVazio = async (tenantConfig, dataFato, transaction) => {
  const pacienteId = await definirDimensaoPacienteDefault(transaction);
  const localizacaoId = await definirDimensaoLocalizacaoDefault(tenantConfig, transaction);
  return models.FatoNotificacaoCovid19.create({
    dtfato: dataFato,
    dmpacienteid: pacienteId,
    dmlocalizacaoid: localizacaoId,
    municipioId: tenantConfig.municipioId,
  }, { transaction });
};

const getFatosBoletim = async (tenantConfig, dataFato, transaction) => {
  const [fatos] = await models.sequelize.query(`
  select coalesce(sum(fnc.qtsuspeito), 0) as qtnotificado,
  coalesce(sum(fnc.qtencerrado), 0) as qtencerrado,
  coalesce(sum(fnc.qtconfirmado), 0) as qtconfirmado,
  coalesce(sum(fnc.qtconfirmadoisolamento), 0) as qtconfirmadoisolamento,
  coalesce(sum(fnc.qtconfirmadoregular), 0) as qtconfirmadoregular,
  coalesce(sum(fnc.qtconfirmadouti), 0) as qtconfirmadouti,
  coalesce(sum(fnc.qtrecuperado), 0) as qtconfirmadoencerrado,
  coalesce(sum(fnc.qtobito), 0) as qtobito,
  coalesce(sum(fnc.qtdescartado), 0) as qtdescartado,
  COALESCE((sum(fnc.qtsuspeito) - sum(fnc.qtencerrado) - sum(fnc.qtdescartado) - sum(fnc.qtrecuperado) - sum(fnc.qtobito))::numeric, 0::numeric) AS qtacompanhamento
  from "FatoNotificacaoCovid19" fnc
  where fnc."municipioId" = :municipioId and fnc.dtfato::date <= :dataFato;`,
  {
    replacements: {
      municipioId: tenantConfig.municipioId,
      dataFato: dataFato.toDate(),
    },
    type: Sequelize.QueryTypes.SELECT,
    transaction,
  });
  const acompanhamentos = await notificacaoRepository
    .getAcompanhamentoSuspeitos(tenantConfig, dataFato, transaction);
  if (!fatos) {
    return {
      dtaprovacao: null,
      aprovado: false,
      qtnotificado: 0,
      qtencerrado: 0,
      qtconfirmado: 0,
      qtconfirmadoisolamento: 0,
      qtconfirmadoregular: 0,
      qtconfirmadouti: 0,
      qtconfirmadoencerrado: 0,
      qtobito: 0,
      qtdescartado: 0,
      qtacompanhamento: 0,
      qtsuspeitoisolamento: 0,
      qtsuspeitoregular: 0,
      qtsuspeitouti: 0,
      qtsuspeitoobito: 0,
    };
  }
  return {
    dtaprovacao: dataFato, aprovado: false, ...fatos, ...acompanhamentos,
  };
};

const contarTipoEvolucao = (evolucao, novoFato, campo, tipo) => {
  novoFato[campo] = evolucao === tipo ? 1 : 0;
};

const definirEvolucaoConfirmado = (evolucao, novoFato) => {
  contarTipoEvolucao(evolucao.tpEvolucao, novoFato, 'qtconfirmado', tipoEvolucaoEnum.values.Confirmado);
  novoFato.qtconfirmadoregular = 0;
  novoFato.qtconfirmadouti = 0;
  novoFato.qtconfirmadoisolamento = 0;
  if (evolucao.tpEvolucao === tipoEvolucaoEnum.values.Confirmado) {
    if (evolucao.tpLocal === tipoLocalEnum.values.LeitoComun) {
      novoFato.qtconfirmadoregular = 1;
    } else if (evolucao.tpLocal === tipoLocalEnum.values.LeitoUTI) {
      novoFato.qtconfirmadouti = 1;
    } else if (evolucao.tpLocal === tipoLocalEnum.values.IsolamentoDomiciliar) {
      novoFato.qtconfirmadoisolamento = 1;
    }
  }
};

const definirEvolucaoSuspeito = (evolucao, novoFato) => {
  contarTipoEvolucao(evolucao.tpEvolucao, novoFato, 'qtsuspeito', tipoEvolucaoEnum.values.Suspeito);
  novoFato.qtsuspeitoregular = 0;
  novoFato.qtsuspeitouti = 0;
  novoFato.qtsuspeitoisolamento = 0;
  if (evolucao.tpEvolucao === tipoEvolucaoEnum.values.Suspeito) {
    if (evolucao.tpLocal === tipoLocalEnum.values.LeitoComun) {
      novoFato.qtsuspeitoregular = 1;
    } else if (evolucao.tpLocal === tipoLocalEnum.values.LeitoUTI) {
      novoFato.qtsuspeitouti = 1;
    } else if (evolucao.tpLocal === tipoLocalEnum.values.IsolamentoDomiciliar) {
      novoFato.qtsuspeitoisolamento = 1;
    }
  }
};

const retornarFatoEvolucao = (evolucao) => {
  const novoFato = {};
  definirEvolucaoConfirmado(evolucao, novoFato);
  contarTipoEvolucao(evolucao.tpEvolucao, novoFato, 'qtencerrado', tipoEvolucaoEnum.values.Encerrado);
  contarTipoEvolucao(evolucao.tpEvolucao, novoFato, 'qtdescartado', tipoEvolucaoEnum.values.Descartado);
  contarTipoEvolucao(evolucao.tpEvolucao, novoFato, 'qtrecuperado', tipoEvolucaoEnum.values.Curado);
  contarTipoEvolucao(evolucao.tpEvolucao, novoFato, 'qtobito', tipoEvolucaoEnum.values.Obito);
  definirEvolucaoSuspeito(evolucao, novoFato);
  return novoFato;
};

const getFatoEvolucao = async (tenantConfig, dataFato, evolucao, transaction) => {
  const [fatos] = await models.sequelize.query(`
  select fnc.*
  from "FatoNotificacaoCovid19" fnc
  where fnc."municipioId" = :municipioId and fnc.dtfato::date = :dataFato
  and fnc.dmpacienteid = :dmpacienteid and fnc.dmlocalizacaoid = :dmlocalizacaoid`,
  {
    replacements: {
      municipioId: tenantConfig.municipioId,
      dataFato: dataFato.format(MASCARA_DATA),
      dmpacienteid: evolucao.dmpacienteid,
      dmlocalizacaoid: evolucao.dmlocalizacaoid,
    },
    type: Sequelize.QueryTypes.SELECT,
    transaction,
  });
  return fatos;
};

const definirFatoEvolucao = async (
  tenantConfig, dataFato, evolucao, novoFato, transaction,
) => {
  const existeFato = await getFatoEvolucao(tenantConfig, dataFato, evolucao, transaction);
  if (!existeFato) {
    return models.FatoNotificacaoCovid19.create({
      dtfato: dataFato,
      dmpacienteid: evolucao.dmpacienteid,
      dmlocalizacaoid: evolucao.dmlocalizacaoid,
      municipioId: tenantConfig.municipioId,
      ...novoFato,
    }, { transaction });
  }
  return models.sequelize.query(`update "FatoNotificacaoCovid19" set
    qtsuspeito = qtsuspeito + :qtsuspeito,
    qtsuspeitoisolamento = qtsuspeitoisolamento + :qtsuspeitoisolamento,
    qtsuspeitoregular = qtsuspeitoregular + :qtsuspeitoregular,
    qtsuspeitouti = qtsuspeitouti + :qtsuspeitouti,
    qtencerrado = qtencerrado + :qtencerrado,
    qtconfirmado = qtconfirmado + :qtconfirmado,
    qtconfirmadoisolamento = qtconfirmadoisolamento + :qtconfirmadoisolamento,
    qtconfirmadoregular  = qtconfirmadoregular + :qtconfirmadoregular,
    qtconfirmadouti = qtconfirmadouti + :qtconfirmadouti,
    qtrecuperado = qtrecuperado + :qtrecuperado,
    qtobito = qtobito + :qtobito,
    qtdescartado = qtdescartado + :qtdescartado
    where id = :id`,
  {
    type: Sequelize.QueryTypes.UPDATE,
    replacements: {
      qtsuspeito: novoFato.qtsuspeito,
      qtsuspeitoisolamento: novoFato.qtsuspeitoisolamento,
      qtsuspeitoregular: novoFato.qtsuspeitoregular,
      qtsuspeitouti: novoFato.qtsuspeitouti,
      qtencerrado: novoFato.qtencerrado,
      qtconfirmado: novoFato.qtconfirmado,
      qtconfirmadoisolamento: novoFato.qtconfirmadoisolamento,
      qtconfirmadoregular: novoFato.qtconfirmadoregular,
      qtconfirmadouti: novoFato.qtconfirmadouti,
      qtrecuperado: novoFato.qtrecuperado,
      qtobito: novoFato.qtobito,
      qtdescartado: novoFato.qtdescartado,
      id: existeFato.id,
    },
    transaction,
  });
};

const gerarFatos = async (tenantConfig, dataProximoFechamento, transaction) => {
  const dataFormatada = moment(dataProximoFechamento).toDate();
  await deleteByData(tenantConfig.municipioId, dataFormatada, transaction);

  const { count, data: evolucoes } = await notificacaoRepository
    .getEvolucoesFechamento(tenantConfig, dataFormatada);
  if (count === 0) {
    return gerarFatoVazio(tenantConfig, dataFormatada, transaction);
  }
  let evolucao;
  // eslint-disable-next-line no-restricted-syntax
  for await (evolucao of evolucoes) {
    const novoFato = retornarFatoEvolucao(evolucao);
    await definirFatoEvolucao(tenantConfig, dataProximoFechamento, evolucao, novoFato, transaction);
  }
  return evolucao;
};

exports.deleteByData = deleteByData;
exports.gerarFatoVazio = gerarFatoVazio;
exports.getFatosBoletim = getFatosBoletim;
exports.gerarFatos = gerarFatos;
exports.definirDimensaoPacienteId = definirDimensaoPacienteId;
exports.definirDimensaoLocalizacaoId = definirDimensaoLocalizacaoId;
exports.FATO_PADRAO = FATO_PADRAO;
exports.definirFatoEvolucao = definirFatoEvolucao;
