const Sequelize = require('sequelize');
const models = require('../models');
const tpTransmissaoApiSecretaria = require('../enums/tipo-transmissao-api-secretaria-enum');
const statusNotificacaoEnum = require('../enums/status-notificacao-enum');
const dataEvolucaoEnum = require('../enums/data-evolucao-notificacao-enum');
const tpEvolucaoEnum = require('../enums/tipo-notificacao-evolucao-enum');

const { Op } = Sequelize;

module.exports.cadastrarEvolucao = async (evolucao, transaction) => models.NotificacaoEvolucao
  .create(evolucao, { transaction });

module.exports.getEvolucoesPorNotificacaoId = async (id, tenant) => models.Notificacao.findOne({
  where: { id, municipioId: tenant },
  attributes: ['id', 'status'],
  include: [{
    model: models.Pessoa,
    attributes: ['nome', 'tipoDocumento', 'numeroDocumento', 'telefoneResidencial', 'telefoneContato', 'telefoneCelular'],
  },
  { model: models.NotificacaoEvolucao },
  ],
});

module.exports.deletarEvolucaoPorId = async (id, transaction) => {
  models.NotificacaoEvolucao.destroy({
    where: {
      id,
    },
  },
  {
    transaction,
  });
};

module.exports.atualizarEvolucaoPorId = async (evolucao, transaction) => {
  models.NotificacaoEvolucao.update(
    { ...evolucao },
    {
      where: {
        id: evolucao.id,
      },
    },
    {
      transaction,
    },
  );
};

exports.notificacaoExists = async (id, tenant) => models.Notificacao
  .findOne({ where: { id, municipioId: tenant } });

module.exports.getPorId = async (id, tenant) => models.Notificacao.findOne({
  where: { id, municipioId: tenant },
  include: [
    {
      model: models.Pessoa,
      include: [
        { model: models.Bairro },
        { model: models.Municipio },
        { model: models.Ocupacao },
        { model: models.Pais, as: 'Pais' },
      ],
    },
    {
      model: models.NotificacaoCovid19,
      include: [
        { model: models.Exame },
        { model: models.ResultadoExame },
        {
          model: models.UnidadeSaude,
          as: 'Hospital',
          include: [{ model: models.Municipio }],
        },
        { model: models.UnidadeSaude, as: 'Laboratorio' },
        { model: models.UnidadeSaude, as: 'UnidadeFrequentada' },
      ],
    },
    { model: models.NotificacaoEvolucao },
    { model: models.Municipio },
    { model: models.UnidadeSaude },
    { model: models.User },
    { model: models.ProfissionalSaude },
    { model: models.Profissao },
  ],
});

module.exports.getFechamentosPorNotificacaoId = async (id) => models.NotificacaoEvolucao.findAll({
  where: { notificacaoId: id, dtfechamento: { [Op.ne]: null } },
});

module.exports.getPorPessoaDocumento = async (where) => {
  const { tipoDocumento, numeroDocumento, status = 'ABERTA' } = where;

  return models.Notificacao.findAll({
    where: {
      status,
    },
    include: {
      model: models.Pessoa,
      where: {
        [Op.and]: [{
          tipoDocumento,
        }, {
          numeroDocumento,
        }],
      },
      attributes: ['tipoDocumento', 'numeroDocumento'],
    },
  });
};

exports.atualizar = async (notificacao, tenant) => {
  const { id } = notificacao;
  models.Notificacao.update(
    { ...notificacao },
    { where: { id, municipioId: tenant } },
  );
};

exports.getNotificacoesPendentesEnvioSecretariaPorIds = async (ids, tenant) => models
  .Notificacao.findAll({
    where: {
      id: ids,
      municipioId: tenant,
      status: { [Op.ne]: statusNotificacaoEnum.values.Excluida },
    },
    include: [
      {
        model: models.Pessoa,
        include: [
          { model: models.Bairro },
          { model: models.Municipio },
          { model: models.Ocupacao },
          { model: models.Pais, as: 'Pais' },
        ],
      },
      {
        model: models.NotificacaoEvolucao,
      },
      {
        model: models.NotificacaoCovid19,
        include: [
          { model: models.Exame },
          { model: models.ResultadoExame },
          {
            model: models.UnidadeSaude,
            as: 'Hospital',
            include: [{ model: models.Municipio }],
          },
          { model: models.UnidadeSaude, as: 'Laboratorio' },
          { model: models.UnidadeSaude, as: 'UnidadeFrequentada' },
        ],
        where: {
          [Op.and]: [
            {
              [Op.or]:
                [
                  {
                    tpTransmissaoApiSecretaria:
                      tpTransmissaoApiSecretaria.values.PendenteEnvio,
                  },
                  {
                    tpTransmissaoApiSecretaria:
                      tpTransmissaoApiSecretaria.values.PendenteAtualizacao,
                  },
                  {
                    tpTransmissaoApiSecretaria: null,
                  },
                ],
            },
          ],
        },
      },
      { model: models.Municipio },
      {
        model: models.UnidadeSaude,
        include: [
          { model: models.Municipio },
        ],
      },
      { model: models.User },
      { model: models.ProfissionalSaude },
      { model: models.Profissao },
    ],
  });

exports.getNotificacoesPendentesEnvioSecretaria = async (page = 1, limit = 50, search = '', unidadeId, tenant) => {
  const offset = (page - 1) * limit;
  const filtroPadrao = {
    [Op.or]: [
      {
        tpTransmissaoApiSecretaria: tpTransmissaoApiSecretaria.values.PendenteEnvio,
      },
      {
        tpTransmissaoApiSecretaria: tpTransmissaoApiSecretaria.values.PendenteAtualizacao,
      },
      {
        tpTransmissaoApiSecretaria: null,
      },
    ],
  };
  const filtroTenant = Sequelize.where(Sequelize.col('Notificacao.municipioId'), tenant);
  const filtros = [filtroTenant, filtroPadrao];

  if (unidadeId) {
    const filtroUnidade = Sequelize.where(Sequelize.col('Notificacao.UnidadeSaude.id'), unidadeId);
    filtros.push(filtroUnidade);
  }

  if (search !== '') {
    const filtroSearch = {
      [Op.or]: [
        Sequelize.where(
          Sequelize.fn('upper', Sequelize.col('Notificacao.Pessoa.nome')),
          {
            [Op.like]: `%${search.toUpperCase()}%`,
          },
        ),
        Sequelize.where(
          Sequelize.fn('upper', Sequelize.col('Notificacao.Pessoa.numeroDocumento')),
          {
            [Op.like]: `%${search.toUpperCase()}%`,
          },
        ),
      ],
    };
    filtros.push(filtroSearch);
  }

  const filtroConsulta = {
    where: { [Op.and]: [...filtros] },
  };

  return models.NotificacaoCovid19.findAndCountAll({
    where: filtroConsulta.where,
    attributes: ['id', 'notificacaoId', 'tpTransmissaoApiSecretaria'],
    include: [
      {
        model: models.Notificacao,
        where: {
          status: { [Op.ne]: statusNotificacaoEnum.values.Excluida },
        },
        attributes: ['id', 'unidadeSaudeId', 'pessoaId'],
        include: [
          {
            model: models.Pessoa,
            attributes: ['nome', 'numeroDocumento', 'tipoDocumento'],
          },
          {
            model: models.UnidadeSaude,
            attributes: ['nome'],
          },
        ],
      },
    ],
    limit,
    offset,
    order: [['createdAt', 'ASC']],
  });
};

module.exports.getNotificacoesPorPeriodo = async (periodo, page = 1, limit = 500, tenant) => {
  const offset = (page - 1) * limit;
  const where = periodo
    ? { createdAt: { [Op.gte]: periodo }, municipioId: tenant }
    : { municipioId: tenant };
  where.status = { [Op.ne]: 'EXCLUIDA' };
  return models.Notificacao.findAndCountAll({
    where,
    include: [
      {
        model: models.Pessoa,
        where: { tipoDocumento: { [Op.eq]: 'CPF' } },
        include: [
          { model: models.Bairro },
          { model: models.Municipio },
          { model: models.Ocupacao },
          { model: models.Pais, as: 'Pais' },
        ],
      },
      { model: models.NotificacaoEvolucao },
      {
        model: models.NotificacaoCovid19,
        where: { apiSecretariaId: { [Op.eq]: null } },
      },
      { model: models.Municipio },
      { model: models.UnidadeSaude },
      { model: models.User },
      { model: models.ProfissionalSaude },
      { model: models.Profissao },
    ],
    limit,
    offset,
  });
};

const getSQLEvolucoesFechamento = (filtroTpEvolucao, filtroSearch) => `
select *
from "Notificacao" n
join "NotificacaoEvolucao" ne on ne."notificacaoId" = n.id
JOIN "NotificacaoCovid19" nc ON nc."notificacaoId" = n.id
JOIN "Pessoa" p ON p.id = n."pessoaId"
JOIN "Bairro" b ON b.id = p."bairroId"
JOIN "Municipio" m ON m.id = b."municipioId"
join "UnidadeSaude" u ON u.id = n."unidadeSaudeId"
LEFT JOIN "DmPaciente" dp ON dp.sexo = p.sexo AND dp.comorbidade = temcomorbidade(nc.*) AND dp.faixaetaria = faixaetaria(p."dataDeNascimento")
LEFT JOIN "DmLocalizacao" dl ON dl.bairro = b.nome AND dl.cidade = m.nome AND dl.estado = m.uf AND dl.pais = 'BRASIL'
where n.status <> :status and n."municipioId" = :municipioId and
p."municipioId" IN(:municipios) and ne."createdAt" between :dtInicial and :dtFinal
${filtroTpEvolucao} ${filtroSearch}`;

exports.getEvolucoesFechamento = async (tenantConfig, dataFechamento, options) => {
  const [dtInicial, dtFinal] = tenantConfig.getPeriodoFechamento(dataFechamento);
  let pagination = '';
  let filtroTpEvolucao = '';
  let filtroSearch = '';
  if (options) {
    const {
      page = 1, itemsPerPage: limit = 10, tpEvolucao, search,
    } = options;
    const offset = (+page - 1) * +limit;
    pagination = `limit ${limit} offset ${offset}`;
    filtroTpEvolucao = tpEvolucao ? ` AND ne."tpEvolucao" = '${tpEvolucao}' ` : '';
    const filtroPessoa = `UPPER(p.nome) LIKE '%${search.toUpperCase()}%'`;
    const filtroDocumento = `UPPER(p."numeroDocumento") LIKE '%${search.toUpperCase()}%'`;
    filtroSearch = search ? ` AND (${filtroPessoa} OR ${filtroDocumento}) ` : '';
  }

  const sqlCount = getSQLEvolucoesFechamento(filtroTpEvolucao, filtroSearch).replace('*', 'count(1)');
  const [{ count }] = await models.sequelize.query(sqlCount,
    {
      replacements: {
        status: statusNotificacaoEnum.values.Excluida,
        municipioId: tenantConfig.municipioId,
        municipios: tenantConfig.municipios,
        dtInicial,
        dtFinal,
      },
      type: Sequelize.QueryTypes.SELECT,
    });

  const sqlDetalhes = getSQLEvolucoesFechamento(filtroTpEvolucao, filtroSearch).replace('*', `ne.*,
  dp.id AS dmpacienteid,
  p.nome as paciente, p."numeroDocumento", p.sexo, temcomorbidade(nc.*) AS comorbidade, faixaetaria(p."dataDeNascimento") AS faixaetaria,
  dl.id AS dmlocalizacaoid,
  b.nome AS bairro,
  m.nome AS cidade,
  m.uf AS estado,
  'BRASIL' AS pais,
  u.nome as "unidadeSaude"`).concat(` order by ne."createdAt" ASC ${pagination}`);

  const evolucoes = await models.sequelize.query(sqlDetalhes,
    {
      replacements: {
        status: statusNotificacaoEnum.values.Excluida,
        municipioId: tenantConfig.municipioId,
        municipios: tenantConfig.municipios,
        dtInicial,
        dtFinal,
      },
      type: Sequelize.QueryTypes.SELECT,
    });
  return { count, data: evolucoes };
};

exports.getAcompanhamentoSuspeitos = async (tenantConfig, dataFechamento, transaction) => {
  const evolucoes = await models.sequelize.query(`
    select ne."dtEvolucao"::date, count(ne) as qtSuspeito, count(neiso.id) as qtIsolamento, count(neleito.id) as qtEnfermaria, count(neuti.id) as qtUTI, count(neobt.id) as qtObito
    from "NotificacaoEvolucao" ne
    join "Notificacao" n on n.id = ne."notificacaoId"
    join "Pessoa" p on p.id = n."pessoaId"
    left outer join "NotificacaoEvolucao" neiso on neiso.id = ne.id and (neiso."tpLocal" = 'ALTA_ISOLAMENTO_DOMICILIAR' or neiso."tpLocal" is null)
    left outer join "NotificacaoEvolucao" neleito on neleito.id = ne.id and neleito."tpLocal" = 'INTERNAMENTO_LEITO_COMUM'
    left outer join "NotificacaoEvolucao" neuti on neuti.id = ne.id and neuti."tpLocal" = 'INTERNAMENTO_LEITO_UTI'
    left outer join "NotificacaoEvolucao" neobt on neobt.id = ne.id and neobt."tpLocal" = 'EVOLUCAO_OBITO'
    where n."municipioId" = :municipioId and p."municipioId" IN(:municipios) and
    ne."tpEvolucao" = 'SUSPEITO' and ne."dtEvolucao" <= :dataFechamento
    and not exists (select 1 from "NotificacaoEvolucao" ne2 where ne2."notificacaoId" = ne."notificacaoId" and ne2."tpEvolucao" in ('ENCERRADO', 'CONFIRMADO', 'CURADO', 'OBITO', 'DESCARTADO'))
    group by ne."dtEvolucao"::date
    order by ne."dtEvolucao"::date;`,
  {
    replacements: {
      municipioId: tenantConfig.municipioId,
      municipios: tenantConfig.municipios,
      dataFechamento: dataFechamento.toDate(),
    },
    type: Sequelize.QueryTypes.SELECT,
  }, { transaction });
  const totalEvolucoes = {
    qtsuspeitoisolamento: 0,
    qtsuspeitoregular: 0,
    qtsuspeitouti: 0,
    qtsuspeitoobito: 0,
  };
  return evolucoes.reduce((acc, cur) => {
    acc.qtsuspeitoisolamento += +cur.qtisolamento;
    acc.qtsuspeitoregular += +cur.qtenfermaria;
    acc.qtsuspeitouti += +cur.qtuti;
    acc.qtsuspeitoobito += +cur.qtobito;
    return acc;
  }, totalEvolucoes);
};

exports.definirFechamentoEvolucoes = async (
  tenantConfig, { dataFechamento, transaction, limparFechamento },
) => {
  const [dtInicial, dtFinal] = tenantConfig.getPeriodoFechamento(dataFechamento);
  let dataFechamentoAtualizada = dtFinal;
  if (limparFechamento) {
    dataFechamentoAtualizada = null;
  }

  return models.sequelize.query(`update "NotificacaoEvolucao" set
  dtfechamento = :dataFechamentoAtualizada
  from "Notificacao" n
  join "Pessoa" p on p.id = n."pessoaId"
  where n.id = "NotificacaoEvolucao"."notificacaoId" AND
  n.status <> :status and
  n."municipioId" = :municipioId and
  p."municipioId" IN(:municipios) and
  "NotificacaoEvolucao"."createdAt" between :dtInicial and :dtFinal`,
  {
    type: Sequelize.QueryTypes.UPDATE,
    replacements: {
      dataFechamentoAtualizada,
      status: statusNotificacaoEnum.values.Excluida,
      municipioId: tenantConfig.municipioId,
      municipios: tenantConfig.municipios,
      dtInicial,
      dtFinal,
    },
    transaction,
  });
};

const getSQLUpdateDtFechamentoNotif = (tpEvolucao) => {
  const campo = dataEvolucaoEnum.values[tpEvolucao];
  return `update "Notificacao" set
  "${campo}" = :dtFinal
  from "NotificacaoEvolucao" ne,
  "Pessoa" p
  where ne."notificacaoId" = "Notificacao".id and
  p.id = "Notificacao"."pessoaId" and
  ne."tpEvolucao" = '${tpEvolucao}' and
  "Notificacao".status <> :status and
  "Notificacao"."municipioId" = :municipioId and
  p."municipioId" IN(:municipios) and
  ne.dtfechamento = :dtFinal;`;
};

const executeSQLUpdateDtFechamentoNotif = async (
  tenantConfig, dataFechamento, tpEvolucao, transaction,
) => {
  const [, dtFinal] = tenantConfig.getPeriodoFechamento(dataFechamento);

  await models.sequelize.query(getSQLUpdateDtFechamentoNotif(tpEvolucao),
    {
      type: Sequelize.QueryTypes.UPDATE,
      replacements: {
        status: statusNotificacaoEnum.values.Excluida,
        municipioId: tenantConfig.municipioId,
        municipios: tenantConfig.municipios,
        dtFinal,
      },
      transaction,
    });
};

exports.definirDatasFechamentoNotificacao = async (tenantConfig, dataFechamento, transaction) => {
  await executeSQLUpdateDtFechamentoNotif(
    tenantConfig, dataFechamento, tpEvolucaoEnum.values.Suspeito, transaction,
  );

  await executeSQLUpdateDtFechamentoNotif(
    tenantConfig, dataFechamento, tpEvolucaoEnum.values.Confirmado, transaction,
  );

  await executeSQLUpdateDtFechamentoNotif(
    tenantConfig, dataFechamento, tpEvolucaoEnum.values.Curado, transaction,
  );

  await executeSQLUpdateDtFechamentoNotif(
    tenantConfig, dataFechamento, tpEvolucaoEnum.values.Descartado, transaction,
  );

  await executeSQLUpdateDtFechamentoNotif(
    tenantConfig, dataFechamento, tpEvolucaoEnum.values.Encerrado, transaction,
  );

  await executeSQLUpdateDtFechamentoNotif(
    tenantConfig, dataFechamento, tpEvolucaoEnum.values.Obito, transaction,
  );
};

const getSQLRemoveDtFechamentoNotif = (tpEvolucao) => {
  const campo = dataEvolucaoEnum.values[tpEvolucao];
  return `update "Notificacao" set
  "${campo}" = NULL
  from "NotificacaoEvolucao" ne,
  "Pessoa" p
  where ne."notificacaoId" = "Notificacao".id and
  p.id = "Notificacao"."pessoaId" and
  ne."tpEvolucao" = '${tpEvolucao}' and
  "Notificacao".status <> :status and
  "Notificacao"."municipioId" = :municipioId and
  p."municipioId" IN(:municipios) and
  ne.dtfechamento = :dtFinal;`;
};

const executeSQLRemoverDtFechamentoNotif = async (
  tenantConfig, dataFechamento, tpEvolucao, transaction,
) => {
  const [, dtFinal] = tenantConfig.getPeriodoFechamento(dataFechamento);
  await models.sequelize.query(getSQLRemoveDtFechamentoNotif(tpEvolucao),
    {
      type: Sequelize.QueryTypes.UPDATE,
      replacements: {
        status: statusNotificacaoEnum.values.Excluida,
        municipioId: tenantConfig.municipioId,
        municipios: tenantConfig.municipios,
        dtFinal,
      },
      transaction,
    });
};

exports.removerFechamentoNotificacao = async (tenantConfig, dataFechamento, transaction) => {
  await executeSQLRemoverDtFechamentoNotif(
    tenantConfig, dataFechamento, tpEvolucaoEnum.values.Suspeito, transaction,
  );

  await executeSQLRemoverDtFechamentoNotif(
    tenantConfig, dataFechamento, tpEvolucaoEnum.values.Confirmado, transaction,
  );

  await executeSQLRemoverDtFechamentoNotif(
    tenantConfig, dataFechamento, tpEvolucaoEnum.values.Curado, transaction,
  );

  await executeSQLRemoverDtFechamentoNotif(
    tenantConfig, dataFechamento, tpEvolucaoEnum.values.Descartado, transaction,
  );

  await executeSQLRemoverDtFechamentoNotif(
    tenantConfig, dataFechamento, tpEvolucaoEnum.values.Encerrado, transaction,
  );

  await executeSQLRemoverDtFechamentoNotif(
    tenantConfig, dataFechamento, tpEvolucaoEnum.values.Obito, transaction,
  );
};
