const Sequelize = require('sequelize');
const repos = require('../repositories/repository-factory');
const models = require('../models');
const { RegraNegocioErro } = require('../lib/erros');

const getDataProximoFechamento = async () => {
  const queryResult = await models.FechamentoNotificacaoCovid19
    .findOne({
      attributes: [
        [Sequelize.fn('max', Sequelize.col('dataFechamento')), 'ultimoFechamentoNotificacaoCovid19'],
      ],
      raw: true,
    });

  if (!queryResult.ultimoFechamentoNotificacaoCovid19) {
    const dataPrimeiraNotificacaoResult = await models.NotificacaoCovid19.findOne({
      attributes: [
        [Sequelize.fn('min', Sequelize.col('dataHoraNotificacao')), 'dataPrimeiraNotificacao'],
      ],
      raw: true,
    });

    const { dataPrimeiraNotificacao } = dataPrimeiraNotificacaoResult;

    if (!dataPrimeiraNotificacao) {
      throw new RegraNegocioErro('Não existe notificações covid19 cadastradas.');
    }

    return new Date(dataPrimeiraNotificacao);
  }

  const dataProximoFechamento = new Date(queryResult.ultimoFechamentoNotificacaoCovid19);
  dataProximoFechamento.setDate(dataProximoFechamento.getDate() + 1);
  return dataProximoFechamento;
};

const getDadosFechamentoMock = (dataFechamento) => ({
  dataFechamento: new Date(dataFechamento.toDateString()),
  casosNotificados: Math.floor(Math.random() * 500),
  acompanhados: Math.floor(Math.random() * 500),
  internados: Math.floor(Math.random() * 500),
  casosEncerrados: Math.floor(Math.random() * 500),
  confirmados: Math.floor(Math.random() * 500),
  curados: Math.floor(Math.random() * 500),
  obitos: Math.floor(Math.random() * 500),
  confirmadosInternados: Math.floor(Math.random() * 500),
  emIsolamentoDomiciliar: Math.floor(Math.random() * 500),
});

const consultarFechamentosPaginado = async (page, limit) => {
  const offset = (page - 1) * limit;

  return models.FechamentoNotificacaoCovid19.findAndCountAll({
    order: [['updatedAt', 'DESC']],
    limit,
    offset,
  });
};

exports.consultarPaginado = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const limit = 10;

    const fechamentos = await consultarFechamentosPaginado(page, limit);
    return res.json({ count: fechamentos.count, data: fechamentos });
  } catch (err) {
    return next(err);
  }
};

exports.consultarProximoDiaFechamento = async (req, res, next) => {
  try {
    let dataHoje = new Date();
    dataHoje = new Date(dataHoje.toDateString());
    const dataProximoFechamento = await getDataProximoFechamento();

    if (dataProximoFechamento > dataHoje) {
      throw new RegraNegocioErro('Não é possível realizar fechamentos futuros.');
    }

    const dadosFechamento = getDadosFechamentoMock(dataProximoFechamento);

    return res.json({ data: dadosFechamento });
  } catch (err) {
    return next(err);
  }
};

exports.cadastrarProximoFechamento = async (req, res, next) => {
  try {
    const dataProximoFechamento = await getDataProximoFechamento();
    const dadosFechamento = getDadosFechamentoMock(dataProximoFechamento);
    await repos.fechamentoNotificacaoCovid19Repository.cadastrar(dadosFechamento);

    return res.status(204).json();
  } catch (err) {
    return next(err);
  }
};
