const Sequelize = require('sequelize');
const models = require('../models');

const { Op } = Sequelize;

exports.consultaPorNome = async (req, res) => {
  const { nome } = req.query;
  const unidadesSaude = await models.UnidadeSaude.findAll({
    where: {
      nome: {
        [Op.like]: `%${nome}%`,
      },
    },
    limit: 10,
    order: [['nome', 'ASC']],
  });

  return res.json({ data: unidadesSaude });
};

exports.consultarPorUserEmail = async (request, response) => {
  const { email } = request.params;

  const userUnidadesSaude = await models.UserUnidadeSaude.findAll({
    include: [
      {
        model: models.User,
        where: {
          email,
        },
      },
      {
        model: models.UnidadeSaude,
      },
    ],
  });

  if (userUnidadesSaude === null) return response.status(404).json({ error: 'Unidade de saúde não encontrada.' });

  const data = userUnidadesSaude.map((userUnidadeSaude) => userUnidadeSaude.UnidadeSaude);

  return response.json({ data });
};

const montarSelectConsultaBase = (search) => {
  const where = search.trim() !== '' ? `where UPPER(us.nome) like UPPER('%${search}%') or us.cnes LIKE '%${search}%'` : '';
  return `select * from  "UnidadeSaude" us
  join "Municipio" m on m.id = us."municipioId"
  ${where}`;
};

const montarSelectConsulta = (page, limit, search) => {
  const offset = (page - 1) * limit;
  const sql = montarSelectConsultaBase(search);
  return `${sql} order by m.nome, us.nome limit ${limit} offset ${offset}`;
};

exports.consultaUnidades = async (req, res, next) => {
  try {
    const {
      page = 1, itemsPerPage: limit = 10, search = '',
    } = req.query;
    const sqlCountUnidades = montarSelectConsultaBase(search).replace('*', 'count(1)');
    const sqlUnidades = montarSelectConsulta(page, limit, search).replace('*', 'us.*, m.nome as municipio');
    const [{ count: totalUnidades }] = await models.sequelize.query(sqlCountUnidades,
      { type: Sequelize.QueryTypes.SELECT });
    const unidadesSaude = await models.sequelize.query(sqlUnidades,
      { type: Sequelize.QueryTypes.SELECT });

    return res.json({ count: parseInt(totalUnidades, 10), data: unidadesSaude });
  } catch (err) {
    return next(err);
  }
};
