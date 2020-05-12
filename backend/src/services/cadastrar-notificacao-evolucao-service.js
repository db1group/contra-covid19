const repos = require('../repositories/repository-factory');
const models = require('../models');
const statusNotificacaoEnum = require('../enums/status-notificacao-enum');
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
  const tpEvolucaoPrecisaTerConfirmacao = (evolucao.tpEvolucao === 'CURA'
        || evolucao.tpEvolucao === 'OBITO');

  const tpEvolucaoProibidaSeJaConfirmada = (evolucao.tpEvolucao === 'SUSPEITO'
        || evolucao.tpEvolucao === 'DESCARTADO'
        || evolucao.tpEvolucao === 'CONFIRMADO'
        || evolucao.tpEvolucao === 'ENCERRADO');

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
    throw new RegraNegocioErro(`Não é possivel atualizar para ${evolucao.tpEvolucao}
        pois não existe atualização de confirmação.`);
  }
};

const encerrarNotificacao = async (evolucao, t) => {
  const deveEncerrar = (evolucao.tpEvolucao === 'CURA'
        || evolucao.tpEvolucao === 'DESCARTADO'
        || evolucao.tpEvolucao === 'ENCERRADO'
        || evolucao.tpEvolucao === 'OBITO');

  if (!deveEncerrar) {
    return;
  }

  await models.Notificacao.update(
    { status: 'ENCERRADA' },
    {
      where: { id: evolucao.notificacaoId },
      transaction: t,
    },
  );
};

exports.handle = async (evolucaoRequest) => models.sequelize.transaction(async (transaction) => {
  const { notificacaoId } = evolucaoRequest;
  const notificacao = repos.notificacaoRepository.getPorId(notificacaoId);

  validarDataEvolucaoSuperiorDataNotificacao(notificacao, evolucaoRequest.dtEvolucao);
  validarNotificacaoFinalizada(notificacao);
  validarPossuiConfirmacao(evolucaoRequest);

  const evolucoes = repos.notificacaoRepository.getEvolucoesPorNotificacaoId(notificacaoId);

  const evolucoesSort = evolucoes.NotificacaoEvolucaos.sort((a, b) => {
    const dataEvolucaoItemA = new Date(a.dtEvolucao);
    const dataEvolucaoItemB = new Date(b.dtEvolucao);
    return dataEvolucaoItemA - dataEvolucaoItemB;
  });

  const ultimaEvolucao = evolucoesSort[evolucoesSort.length - 1];
  if (ultimaEvolucao.tpEvolucao === evolucaoRequest.tpEvolucao) {
    const msgErro = `Não é permitido cadastrar evolução com mesmo status da última ocorrência. 
                Status utilizado: ${evolucaoRequest.tpEvolucao}.`;
    throw new RegraNegocioErro(msgErro);
  }

  const evolucao = repos.notificacaoRepository.cadastrarEvolucao(evolucaoRequest, transaction);
  encerrarNotificacao(evolucaoRequest, transaction);
  return evolucao;
});
