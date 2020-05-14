const consolidacaoAtualizacaoNotificacaoService = require('./consolidar-notificacao-atualizacao-service');
const repos = require('../repositories/repository-factory');
const Mappers = require('../mapper');
const { RegraNegocioErro } = require('../lib/erros');

module.exports.handle = async (notificacaoRequest, usuarioLogado) => {
  const notificacaoModel = await repos.notificacaoRepository.getPorId(notificacaoRequest.id);

  if (notificacaoModel === null) throw new RegraNegocioErro('Notificação não existe.');

  if (notificacaoModel.status !== 'ABERTA') throw new RegraNegocioErro('Notificação não está mais aberta.');

  if (!usuarioLogado.isRoleSecretariaSaude()) {
    const { unidadeSaudeId } = notificacaoModel;

    const unidadesSaudeUser = await repos.unidadeSaudeRepository
      .getPorUserEmail(usuarioLogado.email);

    if (!unidadesSaudeUser) { throw new RegraNegocioErro('Você não possui autorização para atualizar esta notificação.'); }

    if (!unidadesSaudeUser.some((data) => data.id === unidadeSaudeId)) { throw new RegraNegocioErro('Você não possui autorização para atualizar esta notificação.'); }
  }

  const notificacaoConsolidada = await consolidacaoAtualizacaoNotificacaoService
    .handle(notificacaoRequest);

  const suspeitoUpdate = Mappers.Pessoa.mapearParaModel(notificacaoRequest.suspeito);
  suspeitoUpdate.id = notificacaoConsolidada.suspeito.pessoaId;
  await repos.pessoaRepository.atualizar(suspeitoUpdate);

  const notificacaoUpdate = Mappers.Notificacao.mapearParaNotificacao(notificacaoConsolidada);
  notificacaoUpdate.id = notificacaoRequest.id;
  await repos.notificacaoRepository.atualizar(notificacaoUpdate);

  const { notificacaoCovid19 } = notificacaoUpdate;
  notificacaoCovid19.notificacaoId = notificacaoRequest.id;
  await repos.notificacaoCovid19Repository.atualizar(notificacaoCovid19);
};
