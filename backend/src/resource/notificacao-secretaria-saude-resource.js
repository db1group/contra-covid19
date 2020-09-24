const moment = require('moment');
const secretariaApi = require('../services-api/secretaria-saude/service');
const repos = require('../repositories/repository-factory');
const tpTransmissaoApiSecretaria = require('../enums/tipo-transmissao-api-secretaria-enum');
const EnviarNotificacaoRequest = require('../services-api/secretaria-saude/models/enviar-notificacao-request');
const { RegraNegocioErro } = require('../lib/erros');
const apiErrors = require('../services-api/secretaria-saude/enums/api-errors');
const { UsuarioLogado } = require('../secure/usuario-logado');

const MENSAGEM_UNIDADE_NOTFOUND = 'Unidade de saúde do usuário não encontrada.';

const NOTIFICACAO_NAO_ENCONTRADA = 'Notificação não encontrada.';

const retornarUnidadeUsuarioLogado = async (email, tenant) => repos
  .unidadeSaudeRepository.getPorUserEmail(email, tenant);


const getResponseMessage = (response) => (typeof response === 'string'
  ? { message: response } : { ...response });

const atualizarNotificacaoEnviada = async (notificacao, response) => {
  if (!response) return;
  const { data = {} } = response;
  const { id } = data;
  const idSecretaria = notificacao.NotificacaoCovid19.apiSecretariaId || id;
  if (apiErrors.isIdNaoEncontrado(response)
      || apiErrors.isFichaJaExiste(response)
      || apiErrors.isCPFJaExiste(response)
      || apiErrors.isClassificacaoEvolucaoEncerrada(response)
      || apiErrors.isFichaEncerrada(response)
      || (response.success && response.success === 'true')) {
    await repos.notificacaoCovid19Repository.atualizarTpTransmissaoApiSecretaria(
      notificacao.NotificacaoCovid19.id,
      idSecretaria,
      tpTransmissaoApiSecretaria.values.Enviada,
    );
  }
};

const notificacaoEnviadaComSucesso = (response) => response.success && response.success === 'true';

const tratarRespostaEnvio = (response, nome) => {
  let retorno;
  if (!response) {
    retorno = { message: 'Não foi possível realizar o envio da notificação.' };
  } else if (notificacaoEnviadaComSucesso(response)) {
    retorno = { success: 'Notificação enviada com sucesso.', data: response.data };
  } else if (apiErrors.isFichaJaExiste(response)) {
    retorno = { message: `A notificação do paciente ${nome} já possui cadastro.` };
  } else {
    retorno = getResponseMessage(response);
  }
  const { id, ...retornoApi } = retorno;
  return id ? { ...retornoApi, message: id } : retornoApi;
};

const enviarNotificacao = async (id, tenant, tenantConfig) => {
  const notificacao = await repos.notificacaoRepository.getPorId(id, tenant);
  if (!notificacao) throw new RegraNegocioErro(NOTIFICACAO_NAO_ENCONTRADA);
  const request = new EnviarNotificacaoRequest(notificacao);
  const response = await secretariaApi.enviarNotificacao(request, tenantConfig.tokenSecretaria);

  console.info('Retorno Envio Secretaria: ', response);
  await atualizarNotificacaoEnviada(notificacao, response);
  return tratarRespostaEnvio(response, notificacao.Pessoa.nome);
};

exports.enviarNotificacao = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { tenant } = new UsuarioLogado(req);
    const tenantConfig = await repos.tenantConfigRepository.getTenantConfig(req, tenant);
    const response = await enviarNotificacao(id, tenant, tenantConfig);

    return res.json({ data: response });
  } catch (err) {
    console.error('Erro Envio Notificação: ', err);
    return next(err);
  }
};

exports.getPendentesEnvio = async (req, res, next) => {
  try {
    const { page = 1, itemsPerPage = 50, search = '' } = req.query;
    const { email } = req.kauth.grant.access_token.content;
    const usuarioLogado = new UsuarioLogado(req);
    let unidadeSaudeId;
    if (!usuarioLogado.isRoleSecretariaSaude()) {
      const [unidadeSaude] = await retornarUnidadeUsuarioLogado(email, usuarioLogado.tenant);
      if (!unidadeSaude) throw new RegraNegocioErro(MENSAGEM_UNIDADE_NOTFOUND);
      unidadeSaudeId = unidadeSaude.id;
    }

    const notificacoes = await repos.notificacaoRepository
      .getNotificacoesPendentesEnvioSecretaria(page, itemsPerPage, search, unidadeSaudeId,
        usuarioLogado.tenant);

    const notificacoesPendentes = notificacoes.rows.map((data) => ({
      notificacaoId: data.Notificacao.id,
      nomePaciente: data.Notificacao.Pessoa.nome,
      dataHoraNotificacao: data.dataHoraNotificacao,
      nomeUnidadeSaude: data.Notificacao.UnidadeSaude.nome,
      numeroDocumento: data.Notificacao.Pessoa.numeroDocumento,
      tipoDocumento: data.Notificacao.Pessoa.tipoDocumento,
      mensagem: '',
      tpTransmissao: data.tpTransmissaoApiSecretaria,
    }));

    return res.json({ count: notificacoes.count, data: notificacoesPendentes });
  } catch (err) {
    return next(err);
  }
};

const criarPromiseEnvioNotificacao = (notificacao, tenantConfig) => new Promise(
  // eslint-disable-next-line no-async-promise-executor
  async (resolve, reject) => {
    try {
      if (!tenantConfig.tokenSecretaria) {
        throw new RegraNegocioErro('Não foi gerado o Token de Envio para o município informado.');
      }
      const request = new EnviarNotificacaoRequest(notificacao);
      let response;

      const tpTransmissao = notificacao.NotificacaoCovid19.tpTransmissaoApiSecretaria
          || 'PENDENTE_ENVIO';

      if (!notificacao.NotificacaoCovid19.apiSecretariaId
          || tpTransmissao === tpTransmissaoApiSecretaria.values.PendenteEnvio) {
      // eslint-disable-next-line no-await-in-loop
        response = await secretariaApi.enviarNotificacao(
          request, tenantConfig.tokenSecretaria,
        );
      } else {
        request.id = notificacao.NotificacaoCovid19.apiSecretariaId;
        // eslint-disable-next-line no-await-in-loop
        response = await secretariaApi.atualizarNotificacao(
          request, tenantConfig.tokenSecretaria,
        );
      }

      console.info('Retorno Envio Secretaria: ', response);

      await atualizarNotificacaoEnviada(notificacao, response);
      const retornoData = tratarRespostaEnvio(response, notificacao.Pessoa.nome);
      return resolve({ id: notificacao.id, ...retornoData });
    } catch (err) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return reject({ id: notificacao.id, message: err.message });
    }
  },
);

const EnviarNotificacoesSecretariaSaude = (notificacoes, tenantConfig) => Promise.allSettled(
  notificacoes.map((n) => criarPromiseEnvioNotificacao(n, tenantConfig)),
).then((res) => res.map((p) => (p.status === 'rejected' ? p.reason : p.value)));

exports.enviarNotificacoes = async (req, res, next) => {
  try {
    const ids = req.body;
    const { tenant } = new UsuarioLogado(req);
    const tenantConfig = await repos.tenantConfigRepository.getTenantConfig(req, tenant);
    const notificacoes = await repos.notificacaoRepository
      .getNotificacoesPendentesEnvioSecretariaPorIds(ids, tenant);
    if (notificacoes.length === 0) {
      throw new RegraNegocioErro('Não foi encontrado notificações com estas informações.');
    }
    const dataErrors = await EnviarNotificacoesSecretariaSaude(notificacoes, tenantConfig);

    return res.json({ data: dataErrors });
  } catch (err) {
    console.error('Erro Envio Notificação: ', err);
    return next(err);
  }
};

const reenviarNotificacao = async (notificacao, tenantConfig, secretariaId) => {
  // eslint-disable-next-line no-param-reassign
  notificacao.NotificacaoCovid19.apiSecretariaId = secretariaId;
  const { tpTransmissaoApiSecretaria: tpTransmissao = 'PENDENTE_ATUALIZACAO' } = notificacao.NotificacaoCovid19;
  if (tpTransmissao === 'PENDENTE_ENVIO') {
    // eslint-disable-next-line no-param-reassign
    notificacao.NotificacaoCovid19.tpTransmissaoApiSecretaria = 'PENDENTE_ATUALIZACAO';
  }
  let retorno = await criarPromiseEnvioNotificacao(notificacao, tenantConfig);
  retorno = retorno.success ? { ...retorno, success: 'Notificação atualizada com sucesso.' } : retorno;
  return retorno;
};

const buscarNotificacaoEstado = async (notificacao, tenantConfig) => {
  const {
    nome, tipoDocumento,
    numeroDocumento: cpf = '', dataDeNascimento, nomeDaMae,
  } = notificacao.Pessoa;
  if (!tenantConfig.tokenSecretaria) {
    throw new Error('Não foi gerado o Token de Envio para o municípo informado.');
  }

  let response;
  if (tipoDocumento === 'CPF' && cpf.trim() !== '') {
    response = await secretariaApi.buscarNotificacao(
      cpf, tenantConfig.tokenSecretaria,
    );
  } else {
    const nascimento = moment(dataDeNascimento).format('YYYY-MM-DD');
    response = await secretariaApi.buscarNotificacaoSemCPF(
      nome, nascimento, nomeDaMae, tenantConfig.tokenSecretaria,
    );
  }

  const found = response
  && response.registros ? response.registros >= 1 : false;

  if (!found || !response.data) {
    return [];
  }
  return response.data;
};

const criarPromiseSincronizacaoNotificacao = (notificacao, tenantConfig, reenviar) => new Promise(
  // eslint-disable-next-line no-async-promise-executor
  async (resolve, reject) => {
    const {
      nome,
      numeroDocumento: cpf = '',
    } = notificacao.Pessoa;
    try {
      let response = await buscarNotificacaoEstado(notificacao, tenantConfig);
      if (!response.length === 0) {
        const responseEnvio = await enviarNotificacao(
          notificacao.id, tenantConfig.municipioId, tenantConfig,
        );
        if (!responseEnvio.success) {
          throw new RegraNegocioErro('Não foi possível enviar a notificação.');
        }
        response = responseEnvio;
      }

      if (Array.isArray(response.data) && response.data.length > 1) {
        throw new Error('Existe mais de uma notificação para o paciente. Utilize a página de vincular notificações nestes casos.');
      }

      const notificacaoSecretaria = response.data
      && Array.isArray(response.data)
        ? response.data[0] : response.data;
      const { id } = notificacaoSecretaria;
      await repos.notificacaoCovid19Repository.atualizarTpTransmissaoApiSecretaria(
        notificacao.NotificacaoCovid19.id,
        id,
        tpTransmissaoApiSecretaria.values.Enviada,
      );
      let retorno = { success: 'Notificação sincronizada com sucesso.' };
      if (reenviar) {
        retorno = await reenviarNotificacao(notificacao, tenantConfig, id);
      }
      return resolve({
        id: notificacao.id, secretariaId: id, nome, cpf, ...retorno,
      });
    } catch (err) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return reject({
        id: notificacao.id, nome, cpf, message: err.message,
      });
    }
  },
);

const SincronizarNotificacoesSecretariaSaude = async (notificacoes,
  tenantConfig, reenviar) => Promise.allSettled(
  notificacoes.map((n) => criarPromiseSincronizacaoNotificacao(n, tenantConfig, reenviar)),
).then((res) => res.map((p) => (p.status === 'rejected' ? p.reason : p.value)));

exports.sincronizarNotificacoes = async (req, res, next) => {
  try {
    const {
      periodo, reenviar = false, limit = 100, page = 1,
    } = req.query;
    const { tenant } = new UsuarioLogado(req);
    const tenantConfig = await repos.tenantConfigRepository.getTenantConfig(req, tenant);
    const { count, rows: notificacoes } = await repos.notificacaoRepository
      .getNotificacoesPorPeriodo(periodo, page, limit, tenant);
    const dataErrors = await SincronizarNotificacoesSecretariaSaude(
      notificacoes, tenantConfig, reenviar,
    );
    return res.json({ count, data: dataErrors });
  } catch (err) {
    return next(err);
  }
};

exports.sincronizarNotificacao = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { tenant } = new UsuarioLogado(req);
    const tenantConfig = await repos.tenantConfigRepository.getTenantConfig(req, tenant);
    const notificacao = await repos.notificacaoRepository.getPorId(id, tenant);
    if (!notificacao) throw new RegraNegocioErro(NOTIFICACAO_NAO_ENCONTRADA);
    const dataErrors = await SincronizarNotificacoesSecretariaSaude(
      [notificacao], tenantConfig, false,
    );
    return res.json({ count: 1, data: dataErrors });
  } catch (err) {
    return next(err);
  }
};

exports.realizarBuscaNotificacaoEstado = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { tenant } = new UsuarioLogado(req);
    const tenantConfig = await repos.tenantConfigRepository.getTenantConfig(req, tenant);
    const notificacao = await repos.notificacaoRepository.getPorId(id, tenant);
    if (!notificacao) throw new RegraNegocioErro(NOTIFICACAO_NAO_ENCONTRADA);
    const notificacoes = await buscarNotificacaoEstado(notificacao, tenantConfig);
    return res.json({ data: [...notificacoes] });
  } catch (err) {
    return next(err);
  }
};
