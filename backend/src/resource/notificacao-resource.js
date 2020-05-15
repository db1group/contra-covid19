const { Sequelize } = require('sequelize');
const models = require('../models');
const Mappers = require('../mapper');
const { RegraNegocioErro } = require('../lib/erros');
const { UsuarioLogado } = require('../secure/usuario-logado');
const atualizacaoNotificacaoService = require('../services/atualizar-notificacao-service');
const cadastrarNotificacaoService = require('../services/cadastrar-notificacao-service');

const { Op } = Sequelize;

/*
  Refatorar para Repositório de Notificações ou outro local mais apropriado
*/
const consultarNotificacaoPorId = async (id) => models.Notificacao.findOne({
  where: { id },
  include: [
    {
      model: models.Pessoa,
      include: [
        { model: models.Bairro },
        { model: models.Municipio },
        { model: models.Ocupacao },
      ],
    },
    { model: models.NotificacaoCovid19 },
    { model: models.Municipio },
    { model: models.UnidadeSaude },
    { model: models.User },
    { model: models.ProfissionalSaude },
    { model: models.Profissao },
  ],
});

const consultarNotificaoesPaginado = async (page, limit) => {
  const offset = (page - 1) * limit;
  return models.Notificacao.findAndCountAll({
    include: [{
      model: models.Pessoa,
      include: [{
        model: models.Bairro,
      }],
    }, { model: models.NotificacaoCovid19 }],
    order: [['updatedAt', 'DESC']],
    limit,
    offset,
  });
};

exports.salvar = async (req, res, next) => {
  const notificacaoRequest = req.body;
  try {
    const { email } = req.kauth.grant.access_token.content;

    const retorno = await cadastrarNotificacaoService.handle(notificacaoRequest, email);

    return res.json({
      data: {
        ...retorno,
      },
    });
  } catch (error) {
    return next(error);
  }
};

exports.atualizar = async (req, res, next) => {
  const { id } = req.params;
  const notificacaoRequest = req.body;
  try {
    const usuarioLogado = new UsuarioLogado(req);
    notificacaoRequest.id = id;
    await atualizacaoNotificacaoService.handle(notificacaoRequest, usuarioLogado);

    return res.status(204).json();
  } catch (error) {
    return next(error);
  }
};

exports.consultarPaginado = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const limit = 10;
    const notificacoes = await consultarNotificaoesPaginado(page, limit);

    const notificacoesResponse = [];
    notificacoes.rows.map((notificacao) => notificacoesResponse.push(
      Mappers.Notificacao.mapearParaResponse(
        notificacao,
        notificacao.NotificacaoCovid19,
      ),
    ));

    return res.json({ count: notificacoes.count, data: notificacoesResponse });
  } catch (err) {
    return next(err);
  }
};

const obterCampoOrdenacao = async (sortBy) => {
  const ordernacaoIndice = {
    createdAt: 'Notificacao.createdAt',
    nome: 'Pessoa.nome',
    documento: 'Pessoa.numeroDocumento',
    telefone: 'Pessoa.telefoneContato',
    dataNotificacao: 'NotificacaoCovid19.dataHoraNotificacao',
    unidade: 'UnidadeSaude.nome',
    status: 'Notificacao.status',
  };

  if (!sortBy) {
    return ordernacaoIndice.createdAt;
  }
  return ordernacaoIndice[sortBy];
};

const consultarNotificaoesWeb = async (page, limit, sortBy, sortDesc, search = '', status = '') => {
  const campoOrdenacao = await obterCampoOrdenacao(sortBy);
  if (!campoOrdenacao) throw new RegraNegocioErro(`O campo ${sortBy} não é ordenável.`);
  const ordem = sortDesc === 'true' ? 'DESC' : 'ASC';
  const offset = (page - 1) * limit;
  const optionsConsulta = {
    where: {
      status: {
        [Op.ne]: 'EXCLUIDA',
      },
    },
    attributes: ['id', 'unidadeSaudeId', 'status', 'createdAt'],
    include: [{
      model: models.Pessoa,
      attributes: ['nome', 'numeroDocumento', 'telefoneContato'],
      include: models.Municipio,
    }, {
      model: models.NotificacaoCovid19,
      attributes: ['dataHoraNotificacao', 'situacaoNoMomentoDaNotificacao'],
    }, {
      model: models.UnidadeSaude,
      attributes: ['nome'],
    }],
    order: [[Sequelize.col(campoOrdenacao), ordem]],
    limit,
    offset,
  };
  if (status !== '') {
    optionsConsulta.where.status = {
      [Op.and]: [
        optionsConsulta.where.status,
        {
          [Op.eq]: status,
        },
      ],
    };
  }
  if (search !== '') {
    optionsConsulta.where = {
      [Op.and]: [
        { ...optionsConsulta.where },
        {
          [Op.or]: [
            Sequelize.where(
              Sequelize.fn('upper', Sequelize.col('Pessoa.nome')),
              {
                [Op.like]: `%${search.toUpperCase()}%`,
              },
            ),
            Sequelize.where(
              Sequelize.fn('upper', Sequelize.col('Pessoa.numeroDocumento')),
              {
                [Op.like]: `%${search.toUpperCase()}%`,
              },
            ),
          ],
        }],
    };
  }
  return models.Notificacao.findAndCountAll(optionsConsulta);
};

const consultarNotificacoesWebVazia = {
  count: 0,
  data: [],
};

exports.consultarNotificacoesWeb = async (req, res, next) => {
  try {
    const {
      page = 1, itemsPerPage = 10, search = '', sortBy, sortDesc, status,
    } = req.query;
    const notificacoes = await consultarNotificaoesWeb(
      page,
      itemsPerPage,
      sortBy,
      sortDesc,
      search,
      status,
    );
    if (!notificacoes) return res.json(consultarNotificacoesWebVazia);
    const notificacaoConsulta = Mappers.Notificacao.mapearParaConsulta(notificacoes.rows);
    return res.json({ count: notificacoes.count, data: notificacaoConsulta });
  } catch (err) {
    return next(err);
  }
};

exports.consultarPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const notificacaoModel = await consultarNotificacaoPorId(id);

    if (!notificacaoModel) return res.status(204).json();

    const retorno = Mappers.Notificacao.mapearParaResponse(
      notificacaoModel,
      notificacaoModel.NotificacaoCovid19,
    );

    return res.json({ data: retorno });
  } catch (err) {
    return next(err);
  }
};

exports.excluirLogicamenteNotificacao = async (req, res, next) => {
  try {
    const { id } = req.params;
    await models.Notificacao.update(
      { status: 'EXCLUIDA' },
      { where: { id } },
    );
    return res.status(204).json();
  } catch (err) {
    return next(err);
  }
};

exports.excluirLoteLogicamenteNotificacao = async (req, res, next) => {
  try {
    const ids = req.body;
    await models.Notificacao.update(
      { status: 'EXCLUIDA' },
      { where: { id: { [Op.in]: ids } } },
    );
    return res.status(204).json();
  } catch (err) {
    return next(err);
  }
};
