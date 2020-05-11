const consolidacaoService = require('./consolidar-notificacao-service');
const repos = require('../repositories/repository-factory');
const Mappers = require('../mapper');
const { RegraNegocioErro } = require('../lib/erros');

module.exports.handle = async (notificacaoRequest, usuarioLogado) => {
  const notificacaoModel = await repos.notificacaoRepository.getPorId(notificacaoRequest.id);

  if (usuarioLogado.isRoleSecretariaSaude()) {
    const { unidadeSaudeId } = notificacaoModel;

    const unidadesSaudeUser = await repos.unidadeSaudeRepository
      .getPorUserEmail(usuarioLogado.email);

    if (!unidadesSaudeUser) { throw new RegraNegocioErro('Você não possui autorização para atualizar esta notificação.'); }

    if (!unidadesSaudeUser.some((data) => data.id === unidadeSaudeId)) { throw new RegraNegocioErro('Você não possui autorização para atualizar esta notificação.'); }
  }

  const { tipoDocumento, numeroDocumento, status = 'ABERTA' } = notificacaoRequest.suspeito;

  const notificacoesAbertasSuspeito = await repos.notificacaoRepository
    .getPorPessoaDocumento(tipoDocumento, numeroDocumento, status);

  if (notificacoesAbertasSuspeito.length > 1) {
    throw new RegraNegocioErro('Já existe uma notificação aberta para este paciente.');
  }

  const notificacaoConsolidada = await consolidacaoService.handle(notificacaoRequest);

  const suspeitoUpdate = notificacaoRequest.suspeito;
  suspeitoUpdate.id = notificacaoConsolidada.suspeito.pessoaId;
  await repos.pessoaRepository.atualizar(suspeitoUpdate);

  const notificacaoUpdate = Mappers.Notificacao.mapearParaNotificacao(notificacaoConsolidada);
  notificacaoUpdate.id = notificacaoRequest.id;
  await repos.notificacaoRepository.atualizar(notificacaoUpdate);

  const { notificacaoCovid19 } = notificacaoUpdate;
  notificacaoCovid19.notificacaoId = notificacaoRequest.id;
  await repos.notificacaoCovid19Repository.atualizar(notificacaoCovid19);
};
