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
      .query('select * from public.vwresultadocovid19',
        {
          type: Sequelize.QueryTypes.SELECT,
        });

    const response = { data: exames };
    req.setCache(req, JSON.stringify(response));
    req.removeCacheByKey(CARDS_CACHE_KEY);
    return res.json(response);
  } catch (err) {
    return next(err);
  }
};

exports.consultaBoletimObitosFaixa = async (req, res, next) => {
  try {
    const OBITOS_CACHE_KEY = 'vwObitosFaixa';
    const isGerandoCache = await req.getCacheByKey(OBITOS_CACHE_KEY);
    if (isGerandoCache) return res.status(204).json();
    req.setCacheByKey(OBITOS_CACHE_KEY, 'OK');

    const obitos = await models
      .sequelize
      .query('select * from public.vwobitosfaixa',
        {
          type: Sequelize.QueryTypes.SELECT,
        });

    const response = { data: obitos };
    req.setCache(req, JSON.stringify(response));
    req.removeCacheByKey(OBITOS_CACHE_KEY);
    return res.json(response);
  } catch (err) {
    return next(err);
  }
};
