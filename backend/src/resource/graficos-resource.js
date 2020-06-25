const Sequelize = require('sequelize');
const models = require('../models');

exports.consultarBoletimGraficoUltimos30Dias = async (req, res, next) => {
  try {
    const boletims = await models.sequelize.query('select * from public.vwboletimpopulacao where dtaprovacao >= (current_timestamp - interval \'30 days\')', {
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
    const [cards = {}] = await models.sequelize.query('select * from public.vwboletimcards', {
      type: Sequelize.QueryTypes.SELECT,
    });

    const response = { data: cards };
    req.setCache(req, JSON.stringify(response));
    return res.json(response);
  } catch (err) {
    return next(err);
  }
};

exports.consultarBoletimGraficoDiarioUltimos30Dias = async (req, res, next) => {
  try {
    const boletims = await models.sequelize.query('select * from public.vwboletimpopulacaodiario where dtaprovacao >= (current_timestamp - interval \'30 days\')', {
      type: Sequelize.QueryTypes.SELECT,
    });

    const response = { results: boletims };
    req.setCache(req, JSON.stringify(response));
    return res.json(response);
  } catch (err) {
    return next(err);
  }
};
