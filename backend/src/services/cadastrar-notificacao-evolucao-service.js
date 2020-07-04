const repos = require('../repositories/repository-factory');
const models = require('../models');
const statusNotificacaoEnum = require('../enums/status-notificacao-enum');
const tipoNotificacaoEvolucaoEnum = require('../enums/tipo-notificacao-evolucao-enum');
const dataEvolucaoNotificacaoEnum = require('../enums/data-evolucao-notificacao-enum');
const { RegraNegocioErro } = require('../lib/erros');

const validarDataEvolucaoSuperiorDataNotificacao = async (notificacao, dtEvolucao) => {
  const { NotificacaoCovid19 } = notificacao;
  if (!NotificacaoCovid19) throw new Error(`Não foi possível encontrar a notificação ${notificacao.id}`);

  const dataHoraNotificacao = new Date(NotificacaoCovid19.dataHoraNotificacao);
  const dataEvolucao = new Date(dtEvolucao);
  if (dataEvolucao < dataHoraNotificacao) throw new RegraNegocioErro('A data da evolução não pode ser menor que a data da notificação.');
};

const validarNotificacaoFinalizada = async (notificacao) => {
  if (notificacao.status === statusNotificacaoEnum.values.Excluida
    || notificacao.status === statusNotificacaoEnum.values.Encerrada) {
    throw new RegraNegocioErro(`Não é possível adicionar nova evolução pois a notificação está ${notificacao.status}.`);
  }
};

const validarPossuiConfirmacao = async (evolucao) => {
  const tpEvolucaoPrecisaTerConfirmacao = (evolucao.tpEvolucao === tipoNotificacaoEvolucaoEnum
    .values.Curado
    || evolucao.tpEvolucao === tipoNotificacaoEvolucaoEnum
      .values.Obito);

  const tpEvolucaoProibidaSeJaConfirmada = (evolucao.tpEvolucao === tipoNotificacaoEvolucaoEnum
    .values.Suspeito
    || evolucao.tpEvolucao === tipoNotificacaoEvolucaoEnum
      .values.Descartado
    || evolucao.tpEvolucao === tipoNotificacaoEvolucaoEnum
      .values.Confirmado
    || evolucao.tpEvolucao === tipoNotificacaoEvolucaoEnum
      .values.Encerrado);

  if (!(tpEvolucaoPrecisaTerConfirmacao || tpEvolucaoProibidaSeJaConfirmada)) {
    return;
  }

  const evolucaoConfirmado = await models.NotificacaoEvolucao.findOne({
    attributes: ['tpEvolucao'],
    where: {
      notificacaoId: evolucao.notificacaoId,
      tpEvolucao: 'CONFIRMADO',
    },
  });

  if (evolucaoConfirmado && tpEvolucaoProibidaSeJaConfirmada) {
    const msgErro = `Não é possivel atualizar para ${evolucao.tpEvolucao} pois já existe atualização de confirmação.`;
    throw new RegraNegocioErro(msgErro);
  }

  if (!evolucaoConfirmado && tpEvolucaoPrecisaTerConfirmacao) {
    throw new RegraNegocioErro(`Não é possivel atualizar para ${evolucao.tpEvolucao} pois não existe atualização de confirmação.`);
  }
};

const validarProximaEvolucao = async (evolucaoRequest) => {
  const evolucoes = await repos.notificacaoRepository
    .getEvolucoesPorNotificacaoId(evolucaoRequest.notificacaoId);

  if (evolucoes.NotificacaoEvolucaos.length === 0) return;

  const evolucoesSort = evolucoes.NotificacaoEvolucaos.sort((a, b) => {
    const dataEvolucaoItemA = new Date(a.dtEvolucao);
    const dataEvolucaoItemB = new Date(b.dtEvolucao);
    return dataEvolucaoItemA - dataEvolucaoItemB;
  });

  const ultimaEvolucao = evolucoesSort[evolucoesSort.length - 1];
  if (ultimaEvolucao.tpEvolucao === evolucaoRequest.tpEvolucao) {
    const msgErro = 'Não é permitido cadastrar evolução com mesmo status da última ocorrência.';
    throw new RegraNegocioErro(msgErro);
  }

  const dataUltimaEvolucao = new Date(ultimaEvolucao.dtEvolucao);
  const dataEvolucao = new Date(evolucaoRequest.dtEvolucao);
  if (dataEvolucao <= dataUltimaEvolucao) throw new RegraNegocioErro('A data da evolução não pode ser menor que a data da última ocorrência de evolução.');
};

const getCampoDataEvolucao = (tpEvolucao) => dataEvolucaoNotificacaoEnum.values[tpEvolucao];

const atualizarStatusNotificacao = async (evolucao, transaction) => {
  const deveEncerrar = (evolucao.tpEvolucao === tipoNotificacaoEvolucaoEnum.values.Curado
    || evolucao.tpEvolucao === tipoNotificacaoEvolucaoEnum.values.Descartado
    || evolucao.tpEvolucao === tipoNotificacaoEvolucaoEnum.values.Encerrado
    || evolucao.tpEvolucao === tipoNotificacaoEvolucaoEnum.values.Obito);

  const status = deveEncerrar ? statusNotificacaoEnum.values.Encerrada
    : statusNotificacaoEnum.values.Aberta;

  const dtTpEvolucao = getCampoDataEvolucao(evolucao.tpEvolucao);

  await models.Notificacao.update(
    { status, [dtTpEvolucao]: evolucao.createdAt },
    {
      where:
      {
        id: evolucao.notificacaoId,
      },
      transaction,
    },
  );
  return evolucao;
};

exports.handle = async (evolucaoRequest) => models.sequelize.transaction(async (transaction) => {
  const { notificacaoId } = evolucaoRequest;
  const notificacao = await repos.notificacaoRepository.getPorId(notificacaoId);

  if (notificacao.status !== 'ABERTA') throw new RegraNegocioErro('Notificação não está mais aberta.');

  await validarDataEvolucaoSuperiorDataNotificacao(notificacao, evolucaoRequest.dtEvolucao);
  await validarNotificacaoFinalizada(notificacao);
  await validarPossuiConfirmacao(evolucaoRequest);
  await validarProximaEvolucao(evolucaoRequest);

  const evolucao = await repos.notificacaoRepository
    .cadastrarEvolucao(evolucaoRequest, transaction);
  return atualizarStatusNotificacao(evolucao, transaction);
});
