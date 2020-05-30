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
    },
    raw: true,
  });

  const { dataPrimeiraNotificacao } = queryResult;
  return dataPrimeiraNotificacao;
};

const getProximaDataFechamento = async () => {
  let dataFechamento = await getDataUltimoFechamento() || null;
  if (!dataFechamento) {
    dataFechamento = await getDataPrimeiraNotificacao();
  } else {
    dataFechamento = moment(dataFechamento).add(1, 'days').startOf('day');
  }

  return moment(dataFechamento);
};

const getDadosFechamento = async (dataFechamento) => {
  const dataFormatada = moment(dataFechamento).format('YYYY-MM-DD');
  await models.sequelize.query('select public.definirfatodia(:dataFormatada);', {
    replacements: { dataFormatada },
  });

  let [boletim] = await models.sequelize.query(
    'SELECT * FROM vwfechamento WHERE aprovado = false and dtaprovacao = :dataFormatada', {
      replacements: { dataFormatada },
      type: Sequelize.QueryTypes.SELECT,
    },
  );

  if (boletim === undefined) {
    boletim = {
      dtaprovacao: dataFormatada,
      qtnotificado: 0,
      qtacompanhamento: 0,
      qtencerrado: 0,
      qtconfirmado: 0,
      qtconfirmadoencerrado: 0,
      qtobito: 0,
      qtconfirmadoisolamento: 0,
    };
  }

  if (moment(boletim.dtaprovacao).startOf('day').toDate() > moment().startOf('day').toDate()) {
    throw new RegraNegocioErro('Não é possível realizar fechamentos futuros.');
  }

  return {
    dataFechamento,
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
        order: [['dataFechamento', 'DESC']],
        limit,
        offset,
      },
    );
  }

  return models.FechamentoNotificacaoCovid19.findAndCountAll({
    order: [['createdAt', 'DESC']],
    limit,
    offset,
  });
};

const getDetalheProximoFechamentoPaginado = async (dataFechamento, page, limit) => {
  const offset = (page - 1) * limit;
  const dtInicial = moment(dataFechamento)
    .startOf('day')
    .subtract(1, 'day')
    .add(13, 'hours')
    .toDate();
  const dtFinal = moment(dataFechamento)
    .startOf('day')
    .add(12, 'hours')
    .add(59, 'minutes')
    .add(59, 'seconds')
    .toDate();

  const evolucoes = await models.NotificacaoEvolucao.findAndCountAll({
    where: {
      createdAt: {
        [Op.between]: [dtInicial, dtFinal],
      },
    },
    attributes: ['createdAt', 'dtEvolucao', 'tpEvolucao'],
    include: [
      {
        model: models.Notificacao,
        attributes: ['id'],
        include: [
          {
            model: models.UnidadeSaude,
            attributes: ['nome'],
            required: true,
          },
          {
            model: models.Pessoa,
            attributes: ['nome'],
            include: {
              model: models.Municipio,
              attributes: [],
              where: {
                nome: {
                  [Op.eq]: 'MARINGA - PR',
                },
              },
              required: true,
            },
            required: true,
          },
        ],
        required: true,
      },
    ],
  },
  {
    order: [['createdAt', 'ASC']],
    limit,
    offset,
  });

  evolucoes.rows = evolucoes.rows.map((data) => ({
    createdAt: data.createdAt,
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
  await models.sequelize.query('select public.realizarfechamento(:dataFormatada);', {
    replacements: { dataFormatada },
  });
  return repos
    .fechamentoNotificacaoCovid19Repository.cadastrar(dadosFechamento);
};

exports.consultarPaginado = async (req, res, next) => {
  try {
    const { dataFechamento = null, page = 1, itemsPerPage: limit = 10 } = req.query;

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
    const { page = 1, limit = 10, dataFechamento } = req.query;

    const detalheFechamento = await getDetalheProximoFechamentoPaginado(
      dataFechamento, page, limit,
    );
    return res.json({ data: detalheFechamento });
  } catch (err) {
    return next(err);
  }
};
