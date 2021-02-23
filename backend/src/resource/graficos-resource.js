const Sequelize = require('sequelize');
const models = require('../models');

exports.consultarBoletimGrafico = async (req, res, next) => {
  try {
    const boletims = await models.sequelize.query('select * from public.vwboletimpopulacao', {
      type: Sequelize.QueryTypes.SELECT,
    });

    const response = { results: boletims };
    req.setCache(req, JSON.stringify(response));
    return res.json(response);
  } catch (err) {
    return next(err);
  }
};

exports.consultarBoletimGraficoPaginado = async (req, res, next) => {
  try {
    const { page = 1, limit = 30 } = req.query;
    const offset = (+page - 1) * limit;

    const [{ total }] = await models.sequelize.query('select count(1) as total from public.vwboletimpopulacao', {
      type: Sequelize.QueryTypes.SELECT,
    });

    const boletims = await models.sequelize.query('select * from public.vwboletimpopulacao limit :limit offset :offset', {
      replacements: { limit, offset },
      type: Sequelize.QueryTypes.SELECT,
    });

    const baseURL = `${req.protocol}://${req.headers.host}${req.originalUrl.split('?')[0]}`;
    const nextPage = ((+limit + offset) >= total) ? null : `${baseURL}?page=${+page + 1}&limit=${limit}`;
    const previous = page <= 1 ? null : `${baseURL}?page=${+page - 1}&limit=${limit}`;

    const response = {
      count: total, next: nextPage, previous, results: boletims,
    };
    req.setCache(req, JSON.stringify(response));
    return res.json(response);
  } catch (err) {
    return next(err);
  }
};

exports.consultarBoletimCards = async (req, res, next) => {
  try {
    const CARDS_CACHE_KEY = 'vwboletimcards';
    const isGerandoCache = await req.getCacheByKey(CARDS_CACHE_KEY);
    if (isGerandoCache) return res.status(204).json();
    req.setCacheByKey(CARDS_CACHE_KEY, 'OK');

    const [cards = {}] = await models.sequelize.query('select * from public.vwboletimcards', {
      type: Sequelize.QueryTypes.SELECT,
    });

    const response = { data: cards };
    req.setCache(req, JSON.stringify(response));
    req.removeCacheByKey(CARDS_CACHE_KEY);
    return res.json(response);
  } catch (err) {
    return next(err);
  }
};

exports.consultarBoletimGraficoDiario = async (req, res, next) => {
  try {
    const boletims = await models.sequelize.query('select * from public.vwboletimpopulacaodiario', {
      type: Sequelize.QueryTypes.SELECT,
    });

    const response = { results: boletims };
    req.setCache(req, JSON.stringify(response));
    return res.json(response);
  } catch (err) {
    return next(err);
  }
};

exports.consultarMediaMovel = async (req, res, next) => {
  try {
    const medias = await models.sequelize.query('select * from public.vwtaxamovel30dias', {
      type: Sequelize.QueryTypes.SELECT,
    });

    const response = { data: medias };
    req.setCache(req, JSON.stringify(response));
    return res.json(response);
  } catch (err) {
    return next(err);
  }
};

exports.consultaBoletimFaixaEtaria = async (req, res, next) => {
  try {
    const CARDS_CACHE_KEY = 'vwboletimporfaixaetaria';
    const isGerandoCache = await req.getCacheByKey(CARDS_CACHE_KEY);
    if (isGerandoCache) return res.status(204).json();
    req.setCacheByKey(CARDS_CACHE_KEY, 'OK');

    const [cards = {}] = await models.sequelize.query('select * from public.vwboletimporfaixaetaria', {
      type: Sequelize.QueryTypes.SELECT,
    });

    const response = { data: cards };
    req.setCache(req, JSON.stringify(response));
    req.removeCacheByKey(CARDS_CACHE_KEY);
    return res.json(response);
  } catch (err) {
    return next(err);
  }
};

exports.consultaBoletimTestesCovid = async (req, res, next) => {
  try {
    const CARDS_CACHE_KEY = 'vwTestesCovid';
    const isGerandoCache = await req.getCacheByKey(CARDS_CACHE_KEY);
    if (isGerandoCache) return res.status(204).json();
    req.setCacheByKey(CARDS_CACHE_KEY, 'OK');

    const exames = await models
      .sequelize
      .query('select dtexame, "tpEvolucao" from vwexamecovid19 where "tpEvolucao" in (\'CONFIRMADO\', \'DESCARTADO\') order by "createdAt"',
        {
          type: Sequelize.QueryTypes.SELECT,
        });

    const resultados = exames.reduce((acc, { dtexame, tpEvolucao }) => {
      acc[dtexame] = {
        positivo: 0, negativo: 0, total: 0, ...acc[dtexame],
      };
      acc[dtexame].positivo = +acc[dtexame].positivo + (tpEvolucao === 'CONFIRMADO' ? 1 : 0);
      acc[dtexame].negativo = +acc[dtexame].negativo + (tpEvolucao === 'DESCARTADO' ? 1 : 0);
      acc[dtexame].total += 1;
      return acc;
    }, {});

    const testes = {
      labels: [], positivos: [], negativos: [], totalPositivos: [], totalNegativos: [],
    };
    // eslint-disable-next-line no-restricted-syntax
    for (const [prop, value] of Object.entries(resultados)) {
      testes.labels = [...testes.labels, prop];
      testes.positivos = [...testes.positivos, value.positivo === 0
        ? 0 : Math.round(((+value.positivo / +value.total) * 100))];
      testes.negativos = [...testes.negativos, value.negativo === 0
        ? 0 : Math.round(((+value.negativo / +value.total) * 100))];
      testes.totalPositivos = [...testes.totalPositivos, +value.positivo];
      testes.totalNegativos = [...testes.totalNegativos, +value.negativo];
    }

    const response = { data: testes };
    req.setCache(req, JSON.stringify(response));
    req.removeCacheByKey(CARDS_CACHE_KEY);
    return res.json(response);
  } catch (err) {
    return next(err);
  }
};
