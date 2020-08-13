const moment = require('moment');
const repos = require('../repositories/repository-factory');
const { UsuarioLogado } = require('../secure/usuario-logado');
const { RegraNegocioErro } = require('../lib/erros');

exports.consultarFechamentos = async (req, res, next) => {
  try {
    const { tenant } = new UsuarioLogado(req);
    const fechamentos = await repos.fechamentoRepository
      .getFechamentos(tenant, req.query);
    return res.json({ count: fechamentos.count, data: fechamentos.rows });
  } catch (err) {
    return next(err);
  }
};

exports.consultarProximoDiaFechamento = async (req, res, next) => {
  try {
    const { tenant } = new UsuarioLogado(req);
    const tenantConfig = await repos.tenantConfigRepository.getTenantConfig(req, tenant);
    const dataProximoFechamento = await repos.fechamentoRepository
      .getProximaDataFechamento(tenantConfig);
    if (moment(dataProximoFechamento).startOf('day').toDate() > moment().startOf('day').toDate()) {
      throw new RegraNegocioErro('Não é possível realizar fechamentos futuros.');
    }
    const dadosFechamento = await repos.fechamentoRepository
      .getDadosFechamento(tenantConfig, dataProximoFechamento);
    return res.json({ data: dadosFechamento });
  } catch (err) {
    return next(err);
  }
};

exports.getDetalheProximoFechamento = async (req, res, next) => {
  try {
    const { tenant } = new UsuarioLogado(req);
    const { dataFechamento } = req.query;
    const tenantConfig = await repos.tenantConfigRepository.getTenantConfig(req, tenant);
    const detalheFechamento = await repos.notificacaoRepository
      .getEvolucoesFechamento(tenantConfig, dataFechamento, req.query);
    const { data: evolucoes = [], count } = detalheFechamento;
    return res.json({
      count,
      data: evolucoes.map((data) => ({
        createdAt: data.createdAt,
        dataEvolucao: data.dtEvolucao,
        nomePaciente: data.paciente,
        nomeUnidadeSaude: data.unidadeSaude,
        nomeCidade: data.cidade,
        tpEvolucao: data.tpEvolucao,
      })),
    });
  } catch (err) {
    return next(err);
  }
};

exports.cadastrarProximoFechamento = async (req, res, next) => {
  try {
    const { tenant } = new UsuarioLogado(req);
    const tenantConfig = await repos.tenantConfigRepository.getTenantConfig(req, tenant);
    const fechamento = await repos.fechamentoRepository.realizarFechamento(tenantConfig, req.body);
    repos.fechamentoRepository.removerCacheGraficos(req);
    return res.json({ data: fechamento });
  } catch (err) {
    return next(err);
  }
};

exports.reabrirFechamento = async (req, res, next) => {
  try {
    const { tenant } = new UsuarioLogado(req);
    const { id } = req.params;
    const tenantConfig = await repos.tenantConfigRepository.getTenantConfig(req, tenant);
    const fechamento = await repos.fechamentoRepository.podeReabrirFechamento(tenantConfig, id);
    if (!fechamento) return res.status(404).json({ error: 'Não é possível reabrir este fechamento!' });
    await repos.fechamentoRepository.reabrirFechamento(tenantConfig, fechamento);
    repos.fechamentoRepository.removerCacheGraficos(req);
    return res.send();
  } catch (err) {
    return next(err);
  }
};
