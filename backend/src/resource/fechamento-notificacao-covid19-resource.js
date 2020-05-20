const Sequelize = require('sequelize');
const moment = require('moment');
const repos = require('../repositories/repository-factory');
const models = require('../models');
const { RegraNegocioErro } = require('../lib/erros');

const getDataProximoFechamento = async () => {
  const queryResult = await models.FechamentoNotificacaoCovid19
    .findOne({
      attributes: [
        [Sequelize.fn('max', Sequelize.col('dataFechamento')), 'ultimoFechamentoNotificacaoCovid19'],
      ],
      raw: true,
    });

  if (!queryResult.ultimoFechamentoNotificacaoCovid19) {
    const dataPrimeiraNotificacaoResult = await models.NotificacaoCovid19.findOne({
      attributes: [
        [Sequelize.fn('min', Sequelize.col('dataHoraNotificacao')), 'dataPrimeiraNotificacao'],
      ],
      raw: true,
    });

    const { dataPrimeiraNotificacao } = dataPrimeiraNotificacaoResult;

    if (!dataPrimeiraNotificacao) {
      throw new RegraNegocioErro('Não existe notificações covid19 cadastradas.');
    }

    return moment.utc(dataPrimeiraNotificacao);
  }

  const dataProximoFechamento = moment.utc(queryResult.ultimoFechamentoNotificacaoCovid19);
  dataProximoFechamento.add(1, 'days');
  return dataProximoFechamento;
};

const getDadosFechamento = async (dataFechamento) => {
  const dataFormatada = moment(dataFechamento).format('YYYY-MM-DD');
  const boletins = await models.sequelize.query(
    `SELECT * FROM vwboletimdia WHERE dtaprovacao = '${dataFormatada}'`,
    { type: Sequelize.QueryTypes.SELECT },
  );

  const boletim = boletins[0];

  if (boletim === undefined) {
    const dataBoletim = moment(dataFechamento).format('DD/MM/YYYY');
    throw new RegraNegocioErro(`Não existe boletim para o dia ${dataBoletim}.`);
  }

  return {
    dataFechamento: moment.utc(dataFormatada),
    casosNotificados: parseInt(boletim.qtnotificado, 0),
    acompanhados: parseInt(boletim.qtacompanhamento, 0),
    casosEncerrados: parseInt(boletim.qtencerrado, 0),
    confirmados: parseInt(boletim.qtconfirmado, 0),
    curados: parseInt(boletim.qtconfirmadoencerrado, 0),
    obitos: parseInt(boletim.qtobito, 0),
    emIsolamentoDomiciliar: parseInt(boletim.qtconfirmadoisolamento, 0),
  };
};

const consultarFechamentosPaginado = async (page, limit) => {
  const offset = (page - 1) * limit;

  return models.FechamentoNotificacaoCovid19.findAndCountAll({
    order: [['updatedAt', 'DESC']],
    limit,
    offset,
  });
};

exports.consultarPaginado = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const limit = 10;

    const fechamentos = await consultarFechamentosPaginado(page, limit);
    return res.json({ count: fechamentos.count, data: fechamentos });
  } catch (err) {
    return next(err);
  }
};

exports.consultarProximoDiaFechamento = async (req, res, next) => {
  try {
    let dataHoje = new Date();
    dataHoje = new Date(dataHoje.toDateString());
    const dataProximoFechamento = await getDataProximoFechamento();

    if (dataProximoFechamento > dataHoje) {
      throw new RegraNegocioErro('Não é possível realizar fechamentos futuros.');
    }

    const dadosFechamento = await getDadosFechamento(dataProximoFechamento);

    return res.json({ data: dadosFechamento });
  } catch (err) {
    return next(err);
  }
};

exports.cadastrarProximoFechamento = async (req, res, next) => {
  try {
    const dataProximoFechamento = await getDataProximoFechamento();
    const dadosFechamento = await getDadosFechamento(dataProximoFechamento);
    const fechamento = await repos.fechamentoNotificacaoCovid19Repository
      .cadastrar(dadosFechamento);

    return res.json({ data: fechamento });
  } catch (err) {
    return next(err);
  }
};
