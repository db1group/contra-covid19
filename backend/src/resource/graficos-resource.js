const Sequelize = require('sequelize');
const models = require('../models');

exports.consultarBoletimGraficoUltimos30Dias = async (req, res) => {
  const boletims = await models.sequelize.query('select * from public.vwboletimpopulacao where dtaprovacao >= (current_timestamp - interval \'30 days\')', {
    type: Sequelize.QueryTypes.SELECT,
  });

  return res.json({ results: boletims });
};

exports.consultarBoletimGraficoPaginado = async (req, res) => {
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
  const next = ((+limit + offset) >= total) ? null : `${baseURL}?page=${+page + 1}&limit=${limit}`;
  const previous = page <= 1 ? null : `${baseURL}?page=${+page - 1}&limit=${limit}`;

  return res.json({
    count: total, next, previous, results: boletims,
  });
};

exports.consultarBoletimCards = async (_req, res) => {
  const [cards] = await models.sequelize.query('select * from public.vwboletimcards', {
    type: Sequelize.QueryTypes.SELECT,
  });

  return res.json({
    data: cards,
  });
};
