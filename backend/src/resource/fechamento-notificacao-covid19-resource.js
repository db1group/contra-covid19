const Sequelize = require('sequelize');
const moment = require('moment');
const repos = require('../repositories/repository-factory');
const models = require('../models');
const { RegraNegocioErro } = require('../lib/erros');

const { Op } = Sequelize;

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
  const [boletim] = await models.sequelize.query(
    `SELECT * FROM vwboletimdia WHERE dtaprovacao >= '${dataFormatada}'`,
    { type: Sequelize.QueryTypes.SELECT },
  );

  if (boletim === undefined) {
    const dataBoletim = moment(dataFechamento).format('DD/MM/YYYY');
    throw new RegraNegocioErro(`Não existe boletim para o dia ${dataBoletim}.`);
  }

  if (moment(boletim.dtaprovacao).startOf('day').toDate() >= moment().startOf('day').toDate()) {
    throw new RegraNegocioErro('Não é possível realizar fechamentos do dia ou futuros.');
  }

  return {
    dataFechamento: boletim.dtaprovacao,
    casosNotificados: parseInt(boletim.qtnotificado, 0),
    acompanhados: parseInt(boletim.qtacompanhamento, 0),
    casosEncerrados: parseInt(boletim.qtencerrado, 0),
    confirmados: parseInt(boletim.qtconfirmado, 0),
    curados: parseInt(boletim.qtconfirmadoencerrado, 0),
    obitos: parseInt(boletim.qtobito, 0),
    emIsolamentoDomiciliar: parseInt(boletim.qtconfirmadoisolamento, 0),
  };
};

const consultarFechamentosPaginado = async (page, limit, dataFechamento) => {
  const offset = (page - 1) * limit;

  if (dataFechamento !== null) {
    const dataInicial = moment(dataFechamento).add(-1, 'day').toDate();
    const dataFinal = moment(dataFechamento).add(-1, 'day').endOf('day');

    return models.FechamentoNotificacaoCovid19.findAndCountAll(
      {
        where: {
          dataFechamento: {
            [Op.and]: [
              { [Op.gte]: dataInicial },
              { [Op.lte]: dataFinal },
            ],
          },
        },
      },
      {
        order: [['updatedAt', 'DESC']],
        limit,
        offset,
      },
    );
  }
  return models.FechamentoNotificacaoCovid19.findAndCountAll({
    order: [['updatedAt', 'DESC']],
    limit,
    offset,
  });
};

exports.consultarPaginado = async (req, res, next) => {
  try {
    const { dataFechamento = null } = req.query;
    const { page = 1 } = req.query;
    const limit = 10;

    const fechamentos = await consultarFechamentosPaginado(page, limit, dataFechamento);
    return res.json({ count: fechamentos.count, data: fechamentos });
  } catch (err) {
    return next(err);
  }
};

exports.consultarProximoDiaFechamento = async (req, res, next) => {
  try {
    const dataProximoFechamento = await getDataProximoFechamento();
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
