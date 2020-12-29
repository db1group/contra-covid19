/* eslint-disable no-param-reassign */
const Sequelize = require('sequelize');
const moment = require('moment');
const models = require('../models');
const fatoRepository = require('./fato-repository');
const notificacaoRepository = require('./notificacao-repository');
const fechamentoCovid19Repository = require('./fechamento-notificacao-covid19-repository');

const { Op } = Sequelize;

const getDataUltimoFechamento = async (tenant) => {
  const queryResult = await models.FechamentoNotificacaoCovid19
    .findOne({
      attributes: [
        [Sequelize.fn('max', Sequelize.col('dataFechamento')), 'ultimoFechamentoNotificacaoCovid19'],
      ],
      where: { municipioId: tenant },
      raw: true,
    });

  const { ultimoFechamentoNotificacaoCovid19 } = queryResult;
  return ultimoFechamentoNotificacaoCovid19;
};

const getDataPrimeiraNotificacao = async (tenantConfig) => {
  const queryResult = await models.NotificacaoEvolucao.findOne({
    attributes: [
      [Sequelize.fn('min', Sequelize.col('NotificacaoEvolucao.createdAt')), 'dataPrimeiraNotificacao'],
    ],
    include: {
      attributes: [],
      model: models.Notificacao,
      where: {
        status: {
          [Op.ne]: 'EXCLUIDA',
        },
      },
      include: [{
        attributes: [],
        model: models.Pessoa,
        where: {
          municipioId: {
            [Op.in]: tenantConfig.municipios,
          },
        },
      }],
    },
    raw: true,
  });

  const { dataPrimeiraNotificacao } = queryResult;
  return dataPrimeiraNotificacao;
};

const getProximaDataFechamento = async (tenantConfig) => {
  let dataFechamento = await getDataUltimoFechamento(tenantConfig.municipioId) || null;
  if (!dataFechamento) {
    dataFechamento = await getDataPrimeiraNotificacao(tenantConfig);
  } else {
    dataFechamento = moment(dataFechamento).add(1, 'days').startOf('day');
  }

  return moment(dataFechamento);
};

const getDadosFechamento = async (tenantConfig, dataProximoFechamento) => {
  const transaction = await models.sequelize.transaction();
  try {
    await fatoRepository.gerarFatos(tenantConfig, dataProximoFechamento, transaction);
    const boletim = await fatoRepository
      .getFatosBoletim(tenantConfig, dataProximoFechamento, transaction);
    await transaction.commit();
    return {
      dataFechamento: dataProximoFechamento,
      casosNotificados: parseInt(boletim.qtnotificado, 10),
      acompanhados: parseInt(boletim.qtacompanhamento, 10),
      casosEncerrados: parseInt(boletim.qtencerrado, 10),
      confirmados: parseInt(boletim.qtconfirmado, 10),
      curados: parseInt(boletim.qtconfirmadoencerrado, 10),
      obitos: parseInt(boletim.qtobito, 10),
      emIsolamentoDomiciliar: parseInt(boletim.qtconfirmadoisolamento, 10),
      status: 'FECHADO',
      descartados: parseInt(boletim.qtdescartado, 10),
    };
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
};

const removerCacheGraficos = (req) => {
  req.removeCacheByKey('/public/boletim/grafico');
  req.removeCacheByKey('/public/boletim/grafico-diario');
  req.removeCacheByKey('/public/boletim/graficoPaginado');
  req.removeCacheByKey('/public/boletim/cards');
  req.removeCacheByKey('/public/boletim/media-movel');
  req.removeCacheByKey('/public/boletim/grafico-faixaetaria');
};

const realizarFechamento = async (tenantConfig, { dataFechamento }) => {
  const dadosFechamento = await getDadosFechamento(tenantConfig, moment(dataFechamento));
  return models.sequelize.transaction(async (t) => {
    await notificacaoRepository.definirFechamentoEvolucoes(tenantConfig,
      { dataFechamento, transaction: t });
    await notificacaoRepository.definirDatasFechamentoNotificacao(tenantConfig, dataFechamento, t);
    await models.AprovacaoDado.create(
      { data: dataFechamento, aprovado: true, municipioId: tenantConfig.municipioId },
      { transaction: t },
    );
    return fechamentoCovid19Repository.cadastrar(
      {
        ...dadosFechamento,
        municipioId: tenantConfig.municipioId,
      }, t,
    );
  });
};

const podeReabrirFechamento = async (tenantConfig, id) => {
  const filtroBloqueio = tenantConfig.dtBloqueioFechamento
    ? ` AND fnc."dataFechamento" > '${tenantConfig.dtBloqueioFechamento}' `
    : '';
  const filtroTenant = (alias) => `${alias}."municipioId" = :municipioId`;
  const [fatos] = await models.sequelize.query(`
  select fnc.id, fnc."dataFechamento"
  from "FechamentoNotificacaoCovid19" fnc where fnc.id = :id ${filtroBloqueio} and ${filtroTenant('fnc')}
  and (not exists (select 1 from "FechamentoNotificacaoCovid19" fne where fne."dataFechamento"::date = (fnc."dataFechamento"::date + 1) AND ${filtroTenant('fne')})
  or exists (select 1 from "FechamentoNotificacaoCovid19" fe where fe.status = 'REABERTO' and fe."dataFechamento"::date = (fnc."dataFechamento"::date + 1) AND ${filtroTenant('fe')}));`,
  {
    replacements: {
      id,
      municipioId: tenantConfig.municipioId,
    },
    type: Sequelize.QueryTypes.SELECT,
  });
  return fatos;
};

const reabrirFechamento = async (tenantConfig, { id, dataFechamento }) => {
  models.sequelize.transaction(async (t) => {
    await models.AprovacaoDado.destroy({ where: { data: dataFechamento }, transaction: t });
    await fechamentoCovid19Repository.delete(id, t);
    await notificacaoRepository.removerFechamentoNotificacao(tenantConfig, dataFechamento, t);
    await notificacaoRepository.definirFechamentoEvolucoes(tenantConfig,
      { dataFechamento, transaction: t, limparFechamento: true });
  });
};

const getFechamentos = async (tenant,
  { dataFechamento = null, page = 1, itemsPerPage: limit = 10 },
) => {
  const offset = (page - 1) * limit;

  if (dataFechamento !== null) {
    const dataInicial = moment(dataFechamento).toDate();
    const dataFinal = moment(dataFechamento).endOf('day');

    return models.FechamentoNotificacaoCovid19.findAndCountAll(
      {
        where: {
          dataFechamento: {
            [Op.between]: [dataInicial, dataFinal],
          },
          municipioId: tenant,
        },
        order: [['dataFechamento', 'DESC']],
        limit,
        offset,
      },
    );
  }

  return models.FechamentoNotificacaoCovid19.findAndCountAll(
    {
      where: { municipioId: tenant },
      order: [['dataFechamento', 'DESC']],
      limit,
      offset,
    },
  );
};

exports.removerCacheGraficos = removerCacheGraficos;
exports.getDadosFechamento = getDadosFechamento;
exports.getProximaDataFechamento = getProximaDataFechamento;
exports.realizarFechamento = realizarFechamento;
exports.podeReabrirFechamento = podeReabrirFechamento;
exports.reabrirFechamento = reabrirFechamento;
exports.getFechamentos = getFechamentos;
