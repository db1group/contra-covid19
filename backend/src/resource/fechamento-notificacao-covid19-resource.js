const Sequelize = require('sequelize');
const moment = require('moment');
const repos = require('../repositories/repository-factory');
const models = require('../models');
const { RegraNegocioErro } = require('../lib/erros');

const { Op } = Sequelize;

const getDataUltimoFechamento = async () => {
  const queryResult = await models.FechamentoNotificacaoCovid19
    .findOne({
      attributes: [
        [Sequelize.fn('max', Sequelize.col('dataFechamento')), 'ultimoFechamentoNotificacaoCovid19'],
      ],
      raw: true,
    });

  const { ultimoFechamentoNotificacaoCovid19 } = queryResult;
  return ultimoFechamentoNotificacaoCovid19;
};

const getDataPrimeiraNotificacao = async () => {
  const queryResult = await models.NotificacaoCovid19.findOne({
    attributes: [
      [Sequelize.fn('min', Sequelize.col('dataHoraNotificacao')), 'dataPrimeiraNotificacao'],
    ],
    raw: true,
  });

  const { dataPrimeiraNotificacao } = queryResult;
  return dataPrimeiraNotificacao;
};

const getProximaDataFechamento = async () => {
  let dataFechamento = await getDataUltimoFechamento();
  if (!dataFechamento) {
    dataFechamento = await getDataPrimeiraNotificacao();
  } else {
    const dataQuery = moment(dataFechamento).add(1, 'days').startOf('day');

    const [notificacaoEvolucao] = await models.NotificacaoEvolucao.findAll(
      {
        where: {
          dtEvolucao: {
            [Op.gte]: dataQuery,
          },
        },
      },
      {
        order: [['dtEvolucao', 'ASC']],
      },
    );

    dataFechamento = notificacaoEvolucao.dtEvolucao;
  }

  return dataFechamento;
};

const getDadosFechamento = async (dataFechamento) => {
  const dataFormatada = moment(dataFechamento).format('YYYY-MM-DD');
  await models.sequelize.query(`select definirfatodia('${dataFormatada}')`);

  const [boletim] = await models.sequelize.query(
    'SELECT * FROM vwboletimdia WHERE aprovado = false',
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
    const dataInicial = moment(dataFechamento).toDate();
    const dataFinal = moment(dataFechamento).endOf('day');

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

const getDetalheProximoFechamentoPaginado = async (page, limit) => {
  const offset = (page - 1) * limit;

  const evolucoes = await models.NotificacaoEvolucao.findAndCountAll({
    where: {
      dtfechamento: {
        [Op.eq]: null,
      },
    },
    attributes: ['dtEvolucao', 'tpEvolucao'],
    include: [
      {
        model: models.Notificacao,
        include: [
          {
            model: models.UnidadeSaude,
            attributes: ['nome'],
          },
          {
            model: models.Pessoa,
            attributes: ['nome'],
          },
        ],
      },
    ],
  },
  {
    order: [['dtEvolucao', 'ASC']],
    limit,
    offset,
  });

  evolucoes.rows = evolucoes.rows.map((data) => ({
    dataEvolucao: data.dtEvolucao,
    nomePaciente: data.Notificacao.Pessoa.nome,
    nomeUnidadeSaude: data.Notificacao.UnidadeSaude.nome,
    tpEvolucao: data.tpEvolucao,
  }));

  return evolucoes;
};

const realizarProximoFechamento = async () => {
  const dataFechamento = await getProximaDataFechamento();
  const dadosFechamento = await getDadosFechamento(dataFechamento);
  const dataFormatada = moment(dadosFechamento.dataFechamento).format('YYYY-MM-DD');
  await models.sequelize.query(`select realizarfechamento('${dataFormatada}')`);
  return repos
    .fechamentoNotificacaoCovid19Repository.cadastrar(dadosFechamento);
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
    const dataFechamento = await getProximaDataFechamento();
    const dadosFechamento = await getDadosFechamento(dataFechamento);
    return res.json({ data: dadosFechamento });
  } catch (err) {
    return next(err);
  }
};

exports.cadastrarProximoFechamento = async (req, res, next) => {
  try {
    const fechamento = await realizarProximoFechamento();
    return res.json({ data: fechamento });
  } catch (err) {
    return next(err);
  }
};

exports.getDetalheProximoFechamento = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const { limit = 10 } = req.query;
    const detalheFechamento = await getDetalheProximoFechamentoPaginado(page, limit);
    return res.json({ data: detalheFechamento });
  } catch (err) {
    return next(err);
  }
};
