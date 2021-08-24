const moment = require('moment');
const repos = require('../repositories/repository-factory');
const models = require('../models');
const sexoEnum = require('../enums/sexo-enum');
const { UsuarioLogado } = require('../secure/usuario-logado');
const { RegraNegocioErro } = require('../lib/erros');

const FAIXA_ETARIA_PADRAO = '14 A 59';
const BAIRRO_GERAL = 'GERAL';

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

exports.realizarFechamentoManual = async (req, res, next) => {
  const { tenant } = new UsuarioLogado(req);
  const tenantConfig = await repos.tenantConfigRepository.getTenantConfig(req, tenant);
  const fechamento = req.body;

  const transaction = await models.sequelize.transaction();
  try {
    const fechamentoDiario = await repos.fechamentoRepository
      .buscarFechamentoPorData(tenantConfig, fechamento, transaction);
    if (fechamentoDiario) {
      return res.status(400).json({ error: 'Já existe um fechamento para a data informada!' });
    }

    const dataFato = moment(fechamento.dataFechamento);
    const fechamentos = await repos.fechamentoRepository
      .getFechamentos(tenant, { itemsPerPage: 1 });
    let [ultimoFechamento] = fechamentos.rows;
    ultimoFechamento = ultimoFechamento ? ultimoFechamento.casosNotificados : 0;
    const pacienteDefaultId = await repos.fatoRepository.definirDimensaoPacienteId(
      transaction, { sexo: sexoEnum.values.Masculino, faixaetaria: FAIXA_ETARIA_PADRAO },
    );
    const bairroDefaultId = await repos.fatoRepository.definirDimensaoLocalizacaoId(
      tenantConfig, transaction, BAIRRO_GERAL,
    );
    const totalNotificados = +fechamento.suspeitos > 0
      ? +fechamento.suspeitos - ultimoFechamento
      : 0;

    const novoFato = {
      ...repos.fatoRepository.FATO_PADRAO,
      dtfato: fechamento.dataFechamento,
      dmlocalizacaoid: bairroDefaultId,
      municipioId: tenantConfig.municipioId,
    };

    // Definir fato geral
    await repos.fatoRepository.definirFatoEvolucao(tenantConfig, dataFato,
      { dmpacienteid: pacienteDefaultId, dmlocalizacaoid: bairroDefaultId },
      {
        ...novoFato,
        dmpacienteid: pacienteDefaultId,
        qtsuspeito: +totalNotificados,
        qtencerrado: fechamento.encerrados,
        qtdescartado: fechamento.descartados,
        qtrecuperado: fechamento.recuperados,
      }, transaction);

    // eslint-disable-next-line no-restricted-syntax
    for await (const caso of fechamento.casos) {
      const { sexo, faixa, qtde } = caso;
      const dmpacienteid = await repos.fatoRepository.definirDimensaoPacienteId(
        transaction, { sexo, faixaetaria: faixa },
      );

      const field = caso.tipo === 'C' ? 'qtconfirmado' : 'qtobito';
      await repos.fatoRepository.definirFatoEvolucao(tenantConfig, dataFato,
        { dmpacienteid, dmlocalizacaoid: bairroDefaultId },
        {
          ...novoFato,
          dmpacienteid,
          [field]: qtde,
        }, transaction);
    }

    const fechamentoManual = await repos.fechamentoRepository
      .realizarFechamentoManual(tenantConfig, fechamento, transaction);

    await transaction.commit();
    return res.json({ data: fechamentoManual });
  } catch (err) {
    await transaction.rollback();
    return next(err);
  }
};
