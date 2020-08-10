const Sequelize = require('sequelize');
const models = require('../models');
const { UsuarioLogado } = require('../secure/usuario-logado');
const { RegraNegocioErro } = require('../lib/erros');
const repos = require('../repositories/repository-factory');

const { Op } = Sequelize;

exports.consultaPorNome = async (req, res) => {
  const { nome = '', tipo } = req.query;
  const { tenant } = new UsuarioLogado(req);
  const filtroUnidadeNome = Sequelize.where(
    Sequelize.fn('upper', Sequelize.col('nome')),
    {
      [Op.like]: `%${nome.toUpperCase()}%`,
    },
  );

  const filtros = [{ municipioId: tenant }, filtroUnidadeNome];
  if (tipo) {
    const filtroTipo = { tpUnidade: tipo.toUpperCase() };
    filtros.push(filtroTipo);
  }

  const where = { [Op.and]: [...filtros] };

  const unidadesSaude = await models.UnidadeSaude.findAll({
    where,
    limit: 10,
    order: [['nome', 'ASC']],
  });

  return res.json({ data: unidadesSaude });
};

exports.consultarPorUserEmail = async (request, response) => {
  const { email } = request.params;
  const { tenant } = new UsuarioLogado(request);
  const userUnidadesSaude = await models.UserUnidadeSaude.findAll({
    include: [
      {
        model: models.User,
        where: {
          email, municipioId: tenant,
        },
      },
      {
        model: models.UnidadeSaude,
      },
    ],
  });

  if (userUnidadesSaude.length === 0) return response.status(404).json({ error: 'Unidade de saúde não encontrada.' });

  const data = userUnidadesSaude.map((userUnidadeSaude) => userUnidadeSaude.UnidadeSaude);

  return response.json({ data });
};

const montarSelectConsultaBase = (search, tenant) => {
  const where = search.trim() !== '' ? ` AND (UPPER(us.nome) like UPPER('%${search}%') or us.cnes LIKE '%${search}%')` : '';
  const filtroTenant = tenant ? ` = '${tenant}' ` : ' IS NULL';
  return `select * from  "UnidadeSaude" us
   join "Municipio" m on m.id = us."municipioId"
   where us."municipioId" ${filtroTenant} ${where}`;
};

const montarSelectConsulta = (page, limit, search, tenant) => {
  const offset = (page - 1) * limit;
  const sql = montarSelectConsultaBase(search, tenant);
  return `${sql} order by m.nome, us.nome limit ${limit} offset ${offset}`;
};

exports.consultaUnidades = async (req, res, next) => {
  try {
    const {
      page = 1, itemsPerPage: limit = 10, search = '',
    } = req.query;
    const { tenant } = new UsuarioLogado(req);
    const sqlCountUnidades = montarSelectConsultaBase(search, tenant).replace('*', 'count(1)');
    const sqlUnidades = montarSelectConsulta(page, limit, search, tenant).replace('*', 'us.*, m.nome as municipio');
    const [{ count: totalUnidades }] = await models.sequelize.query(sqlCountUnidades,
      { type: Sequelize.QueryTypes.SELECT });
    const unidadesSaude = await models.sequelize.query(sqlUnidades,
      { type: Sequelize.QueryTypes.SELECT });

    return res.json({ count: parseInt(totalUnidades, 10), data: unidadesSaude });
  } catch (err) {
    return next(err);
  }
};

exports.cadastrar = async (req, res, next) => {
  try {
    const { tenant } = new UsuarioLogado(req);
    const unidadeSaude = await repos.unidadeSaudeRepository.cadastraUnidade(tenant, req.body);
    return res.json({ data: unidadeSaude });
  } catch (err) {
    return next(err);
  }
};

const unidadeExists = async (id, tenant) => models.UnidadeSaude
  .findOne({ where: { id, municipioId: tenant } });

const validateUnidadeExists = async (id, tenant) => {
  const exist = await unidadeExists(id, tenant);
  if (!exist) throw new RegraNegocioErro('Unidade não encontrada.');
};

exports.atualizar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const unidade = req.body;
    if (await repos.unidadeSaudeRepository.validarCNESUnico(unidade.cnes, id)) return res.status(400).json({ error: 'CNES já cadastrado para outra Unidade de Saúde.' });
    const { tenant } = new UsuarioLogado(req);
    await validateUnidadeExists(id, tenant);

    const unidadeSaude = await models.UnidadeSaude.update(
      { ...unidade }, {
        where: { id },
        individualHooks: true,
      },
    );

    return res.json({ data: unidadeSaude });
  } catch (err) {
    return next(err);
  }
};

exports.consultarPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { tenant } = new UsuarioLogado(req);
    const unidadesSaude = await models.UnidadeSaude.findOne({
      where: { id, municipioId: tenant },
      include: [
        {
          attributes: ['id', ['nome', 'municipio']],
          model: models.Municipio,
        },
      ],
    });
    if (!unidadesSaude) throw new RegraNegocioErro('Unidade não encontrada.');

    return res.json({ data: unidadesSaude });
  } catch (err) {
    return next(err);
  }
};

exports.deletar = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { tenant } = new UsuarioLogado(req);
    await validateUnidadeExists(id, tenant);
    await models.UnidadeSaude.destroy({ where: { id } });
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
};
