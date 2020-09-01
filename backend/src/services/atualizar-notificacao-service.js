const moment = require('moment');
const consolidacaoAtualizacaoNotificacaoService = require('./consolidar-notificacao-atualizacao-service');
const { validarMenorQueDataHoraAtual } = require('../lib/validacoes-comuns/data');
const repos = require('../repositories/repository-factory');
const Mappers = require('../mapper');
const { RegraNegocioErro } = require('../lib/erros');
const statusNotificacaoEnum = require('../enums/status-notificacao-enum');
// const tpTransmissaoApiSecretaria = require('../enums/tipo-transmissao-api-secretaria-enum');

module.exports.handle = async (notificacaoRequest, usuarioLogado) => {
  validarMenorQueDataHoraAtual(notificacaoRequest.dataHoraNotificacao, 'A', 'data/hora da notificação');

  const notificacaoModel = await repos.notificacaoRepository
    .getPorId(notificacaoRequest.id, usuarioLogado.tenant);

  if (notificacaoModel === null) throw new RegraNegocioErro('Notificação não existe.');

  if (notificacaoModel.status === statusNotificacaoEnum.values.Excluida) throw new RegraNegocioErro('Notificação já foi excluída.');

  if (!usuarioLogado.isRoleSecretariaSaude()) {
    const { unidadeSaudeId } = notificacaoModel;

    const unidadesSaudeUser = await repos.unidadeSaudeRepository
      .getPorUserEmail(usuarioLogado.email, usuarioLogado.tenant);

    if (!unidadesSaudeUser) {
      throw new RegraNegocioErro('Você não possui autorização para atualizar esta notificação.');
    }

    if (!unidadesSaudeUser.some((data) => data.id === unidadeSaudeId)) {
      throw new RegraNegocioErro('Você não possui autorização para atualizar esta notificação.');
    }
  }

  const notificacaoConsolidada = await consolidacaoAtualizacaoNotificacaoService
    .handle(notificacaoRequest, usuarioLogado.tenant);
  const notificacaoUpdate = Mappers.Notificacao.mapearParaNotificacao(notificacaoConsolidada);
  notificacaoUpdate.id = notificacaoRequest.id;
  notificacaoUpdate.municipioId = usuarioLogado.tenant;
  const { notificacaoCovid19 } = notificacaoUpdate;
  notificacaoCovid19.notificacaoId = notificacaoRequest.id;

  if (notificacaoModel.status === statusNotificacaoEnum.values.Encerrada) {
    const notifCovid = {
      notificacaoId: notificacaoRequest.id,
      ...notificacaoConsolidada.hospitalizacao,
    };
    await repos.notificacaoCovid19Repository.atualizar(notifCovid);
    return;
  }

  const notificacaoEvolucoes = await repos.notificacaoRepository
    .getEvolucoesPorNotificacaoId(notificacaoRequest.id, usuarioLogado.tenant);

  const evolucoesSort = notificacaoEvolucoes.NotificacaoEvolucaos.sort((a, b) => {
    const dataEvolucaoItemA = new Date(a.dtEvolucao);
    const dataEvolucaoItemB = new Date(b.dtEvolucao);
    return dataEvolucaoItemA - dataEvolucaoItemB;
  });

  if (notificacaoEvolucoes.NotificacaoEvolucaos.length > 1) {
    const dataHoraNotificacao = moment.utc(notificacaoRequest.dataHoraNotificacao);

    const evolucoesSkip = evolucoesSort.skip(1);
    if (evolucoesSkip.some((data) => moment(data.dtEvolucao).diff(dataHoraNotificacao) === 0)) {
      let msgErro = 'Não é permitido informar uma data/hora da notificação, ';
      msgErro += 'igual a data de uma das evoluções posteriores a primeira.';
      throw new RegraNegocioErro(msgErro);
    }

    const ultimaEvolucao = evolucoesSort.last();

    if (dataHoraNotificacao > ultimaEvolucao.dtEvolucao) {
      let msgErro = 'Não é permitido informar uma data/hora da notificação, ';
      msgErro += 'superior última evolução cadastrada.';
      throw new RegraNegocioErro(msgErro);
    }
  }

  const suspeitoUpdate = Mappers.Pessoa.mapearParaModel(notificacaoRequest.suspeito);
  suspeitoUpdate.id = notificacaoConsolidada.suspeito.pessoaId;
  await repos.pessoaRepository.atualizar(suspeitoUpdate);
  await repos.notificacaoRepository.atualizar(notificacaoUpdate, usuarioLogado.tenant);

  /*
  notificacaoCovid19.tpTransmissaoApiSecretaria = tpTransmissaoApiSecretaria
    .values.PendenteAtualizacao;
    */
  await repos.notificacaoCovid19Repository.atualizar(notificacaoCovid19);

  const primeiraEvolucao = evolucoesSort.first();
  const evolucaoUpdate = {
    id: primeiraEvolucao.id,
    dtEvolucao: notificacaoConsolidada.dataHoraNotificacao,
    tpLocal: notificacaoCovid19.situacaoNoMomentoDaNotificacao,
  };
  await repos.notificacaoRepository.atualizarEvolucaoPorId(evolucaoUpdate);
};
