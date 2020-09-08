const Sequelize = require('sequelize');
const moment = require('moment');
const repos = require('../repositories/repository-factory');
const cadastrarNotificacaoEvolucaoService = require('../services/cadastrar-notificacao-evolucao-service');
const deletarNotificacaoEvolucaoService = require('../services/deletar-notificacao-evolucao-service');
const models = require('../models');
const { UsuarioLogado } = require('../secure/usuario-logado');
const { RegraNegocioErro } = require('../lib/erros');
const tipoNotificacaoEvolucaoEnum = require('../enums/tipo-notificacao-evolucao-enum');

exports.consultar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { tenant } = new UsuarioLogado(req);
    const notificacaoEvolucao = await repos.notificacaoRepository
      .getEvolucoesPorNotificacaoId(id, tenant);
    if (!notificacaoEvolucao) res.status(404).json({ error: 'Notificação não encontrada.' });

    notificacaoEvolucao.NotificacaoEvolucaos = notificacaoEvolucao
      .NotificacaoEvolucaos.sort((a, b) => {
        const dataEvolucaoItemA = new Date(a.dtEvolucao);
        const dataEvolucaoItemB = new Date(b.dtEvolucao);
        return dataEvolucaoItemA - dataEvolucaoItemB;
      });

    return res.json({ data: notificacaoEvolucao });
  } catch (err) {
    return next(err);
  }
};

exports.cadastrar = async (req, res, next) => {
  try {
    const evolucaoRequest = req.body;
    const { tenant } = new UsuarioLogado(req);
    const result = await cadastrarNotificacaoEvolucaoService.handle(evolucaoRequest, tenant);

    return res.json({ data: result });
  } catch (err) {
    return next(err);
  }
};

exports.deletar = async (req, res, next) => {
  try {
    const { notificacaoId, id } = req.params;
    const { tenant } = new UsuarioLogado(req);
    await deletarNotificacaoEvolucaoService.handle(notificacaoId, id, tenant);

    return res.status(204).json();
  } catch (err) {
    return next(err);
  }
};

const validarDataFechamento = async (tenant, tenantConfig, createdAt) => {
  const { ultimoFechamentoNotificacaoCovid19 } = await models.FechamentoNotificacaoCovid19
    .findOne({
      attributes: [
        [Sequelize.fn('max', Sequelize.col('dataFechamento')), 'ultimoFechamentoNotificacaoCovid19'],
      ],
      where: { municipioId: tenant },
      raw: true,
    });

  const periodoFechamento = tenantConfig.getPeriodoFechamento(ultimoFechamentoNotificacaoCovid19);

  if (moment(createdAt).toDate() <= periodoFechamento[1]) {
    throw new RegraNegocioErro('Não é possível realizar a alteração pois existe um fechamento para a data informada.');
  }
};

const verificarEvolucaoMaiorOutras = (evolucoes, createdAt, tpEvolucao) => {
  const existeDataMaior = evolucoes.filter((e) => moment(e.createdAt).startOf('second').toDate()
    >= moment(createdAt).toDate() && e.tpEvolucao !== tpEvolucao);
  if (existeDataMaior.length > 0) {
    throw new RegraNegocioErro(`Data de criação de ${tpEvolucao} não pode ser maior que a das outras evoluções.`);
  }
};

const verificarEvolucaoMenor = (evolucoes, createdAt, tpEvolucoes) => {
  tpEvolucoes.forEach((tpEvolucao) => {
    const existeDataMenor = evolucoes
      .filter((e) => moment(e.createdAt).startOf('second').toDate() >= moment(createdAt).toDate()
       && e.tpEvolucao === tpEvolucao);
    if (existeDataMenor.length > 0) {
      throw new RegraNegocioErro(`Data de criação não pode ser menor que a de ${tpEvolucao}.`);
    }
  });
};

const verificarEvolucaoMaior = (evolucoes, createdAt, tpEvolucoes) => {
  tpEvolucoes.forEach((tpEvolucao) => {
    const existeDataMaior = evolucoes
      .filter((e) => moment(e.createdAt).startOf('second').toDate() <= moment(createdAt).toDate()
        && e.tpEvolucao === tpEvolucao);
    if (existeDataMaior.length > 0) {
      throw new RegraNegocioErro(`Data de criação não pode ser maior que a de ${tpEvolucao}.`);
    }
  });
};

exports.alterarEvolucao = async (req, res, next) => {
  try {
    const { notificacaoId, id } = req.params;
    const { createdAt } = req.body;
    const { tenant } = new UsuarioLogado(req);
    const tenantConfig = await repos.tenantConfigRepository.getTenantConfig(req, tenant);

    const evolucao = await models.NotificacaoEvolucao.findOne({
      where: { id, notificacaoId },
      includes: {
        model: models.Notificacao,
        where: { municipioId: tenant },
      },
    });
    if (!evolucao) throw new RegraNegocioErro('Evolução não encontrada.');

    validarDataFechamento(tenant, tenantConfig, createdAt);
    const evolucoes = await models.NotificacaoEvolucao.findAll({ where: { notificacaoId } });


    switch (evolucao.tpEvolucao) {
      case tipoNotificacaoEvolucaoEnum.values.Confirmado:
        verificarEvolucaoMenor(evolucoes, createdAt, [
          tipoNotificacaoEvolucaoEnum.values.Suspeito]);
        verificarEvolucaoMaior(evolucoes, createdAt, [
          tipoNotificacaoEvolucaoEnum.values.Curado,
          tipoNotificacaoEvolucaoEnum.values.Obito,
        ]);
        break;
      case tipoNotificacaoEvolucaoEnum.values.Curado:
      case tipoNotificacaoEvolucaoEnum.values.Obito:
        verificarEvolucaoMenor(evolucoes, createdAt, [
          tipoNotificacaoEvolucaoEnum.values.Suspeito,
          tipoNotificacaoEvolucaoEnum.values.Confirmado]);
        break;
      case tipoNotificacaoEvolucaoEnum.values.Descartado:
      case tipoNotificacaoEvolucaoEnum.values.Encerrado:
        verificarEvolucaoMenor(evolucoes, createdAt, [
          tipoNotificacaoEvolucaoEnum.values.Suspeito]);
        break;
      default:
        verificarEvolucaoMaiorOutras(evolucoes, createdAt,
          [tipoNotificacaoEvolucaoEnum.values.Suspeito]);
    }

    await models.NotificacaoEvolucao.update({ createdAt }, {
      where:
        {
          id,
          notificacaoId,
        },
    });

    return res.status(204).json();
  } catch (err) {
    return next(err);
  }
};
