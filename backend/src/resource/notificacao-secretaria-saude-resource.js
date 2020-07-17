const secretariaApi = require('../services-api/secretaria-saude/service');
const repos = require('../repositories/repository-factory');
const tpTransmissaoApiSecretaria = require('../enums/tipo-transmissao-api-secretaria-enum');
const EnviarNotificacaoRequest = require('../services-api/secretaria-saude/models/enviar-notificacao-request');
const { RegraNegocioErro } = require('../lib/erros');
const apiErrors = require('../services-api/secretaria-saude/enums/api-errors');

exports.enviarNotificacao = async (req, res, next) => {
  try {
    const { id } = req.params;

    const notificacao = await repos.notificacaoRepository.getPorId(id);
    const request = new EnviarNotificacaoRequest(notificacao);
    const response = await secretariaApi.enviarNotificacao(request);

    if (response.statusCode !== 200) {
      throw new RegraNegocioErro(response.data);
    }

    return res.json({ data: response });
  } catch (err) {
    return next(err);
  }
};

exports.getPendentesEnvio = async (req, res, next) => {
  try {
    const { page = 1, itemsPerPage = 50, search = '' } = req.query;
    const notificacoes = await repos.notificacaoRepository
      .getNotificacoesPendentesEnvioSecretaria(page, itemsPerPage, search);

    const notificacoesPendentes = notificacoes.rows.map((data) => ({
      notificacaoId: data.Notificacao.id,
      nomePaciente: data.Notificacao.Pessoa.nome,
      dataHoraNotificacao: data.dataHoraNotificacao,
      nomeUnidadeSaude: data.Notificacao.UnidadeSaude.nome,
      numeroDocumento: data.Notificacao.Pessoa.numeroDocumento,
      tipoDocumento: data.Notificacao.Pessoa.tipoDocumento,
      mensagem: '',
    }));

    return res.json({ count: notificacoes.count, data: notificacoesPendentes });
  } catch (err) {
    return next(err);
  }
};

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
    || (response.success && response.success === 'true')) {
    await repos.notificacaoCovid19Repository.atualizarTpTransmissaoApiSecretaria(
      notificacao.NotificacaoCovid19.id,
      idSecretaria,
      tpTransmissaoApiSecretaria.values.Enviada,
    );
  }
};

const criarPromiseEnvioNotificacao = (notificacao, unidadeSaude) => new Promise(
  // eslint-disable-next-line no-async-promise-executor
  async (resolve, reject) => {
    try {
      if (!unidadeSaude.tokenSecretaria) {
        throw new Error('Não foi gerado o Token da Secretaria de Saúde para a Unidade de Saúde informada.');
      }
      const request = new EnviarNotificacaoRequest(notificacao);
      let retorno;
      let response;

      const tpTransmissao = notificacao.NotificacaoCovid19.tpTransmissaoApiSecretaria
          || 'PENDENTE_ENVIO';

      if (!notificacao.NotificacaoCovid19.apiSecretariaId
          || tpTransmissao === tpTransmissaoApiSecretaria.values.PendenteEnvio) {
      // eslint-disable-next-line no-await-in-loop
        response = await secretariaApi.enviarNotificacao(
          request, unidadeSaude.tokenSecretaria,
        );
      } else {
        request.id = notificacao.NotificacaoCovid19.apiSecretariaId;
        // eslint-disable-next-line no-await-in-loop
        response = await secretariaApi.atualizarNotificacao(
          request, unidadeSaude.tokenSecretaria,
        );
      }

      console.info();
      console.info('Retorno Envio Secretaria: ');
      console.info(response);
      console.info();

      await atualizarNotificacaoEnviada(notificacao, response);

      if (!response) {
        retorno = { message: 'Não foi possível realizar o envio da notificação.' };
      } else if (response.success && response.success === 'true') {
        retorno = { success: 'Notificação enviada com sucesso.' };
      } else if (apiErrors.isFichaJaExiste(response)) {
        retorno = { message: `A notificação do paciente ${notificacao.Pessoa.nome} já possui cadastro.` };
      } else {
        retorno = getResponseMessage(response);
      }
      const { id, ...retornoApi } = retorno;
      return resolve({ id: notificacao.id, ...retornoApi });
    } catch (err) {
    // eslint-disable-next-line prefer-promise-reject-errors
      return reject({ id: notificacao.id, message: err.message });
    }
  },
);

const EnviarNotificacoesSecretariaSaude = (notificacoes, unidadeSaude) => Promise.allSettled(
  notificacoes.map((n) => criarPromiseEnvioNotificacao(n, unidadeSaude)),
).then((res) => res.map((p) => (p.status === 'rejected' ? p.reason : p.value)));

const retornarUnidadeUsuarioLogado = async (email) => repos
  .unidadeSaudeRepository.getPorUserEmail(email);

exports.enviarNotificacoes = async (req, res, next) => {
  try {
    const ids = req.body;
    const notificacoes = await repos.notificacaoRepository
      .getNotificacoesPendentesEnvioSecretariaPorIds(ids);
    const { email } = req.kauth.grant.access_token.content;
    const [unidadeUsuario] = await retornarUnidadeUsuarioLogado(email);

    const dataErrors = await EnviarNotificacoesSecretariaSaude(notificacoes, unidadeUsuario);

    return res.json({ data: dataErrors });
  } catch (err) {
    return next(err);
  }
};

const reenviarNotificacao = async (notificacao, unidadeSaude, secretariaId) => {
  // eslint-disable-next-line no-param-reassign
  notificacao.NotificacaoCovid19.apiSecretariaId = secretariaId;
  const { tpTransmissaoApiSecretaria: tpTransmissao = 'PENDENTE_ATUALIZACAO' } = notificacao.NotificacaoCovid19;
  if (tpTransmissao === 'PENDENTE_ENVIO') {
    // eslint-disable-next-line no-param-reassign
    notificacao.NotificacaoCovid19.tpTransmissaoApiSecretaria = 'PENDENTE_ATUALIZACAO';
  }
  let retorno = await criarPromiseEnvioNotificacao(notificacao, unidadeSaude);
  retorno = retorno.success ? { ...retorno, success: 'Notificação atualizada com sucesso.' } : retorno;
  return retorno;
};

const criarPromiseSincronizacaoNotificacao = (notificacao, unidadeSaude, reenviar) => new Promise(
  // eslint-disable-next-line no-async-promise-executor
  async (resolve, reject) => {
    const { nome, numeroDocumento: cpf } = notificacao.Pessoa;
    try {
      if (!unidadeSaude.tokenSecretaria) {
        throw new Error('Não foi gerado o Token da Secretaria de Saúde para a Unidade de Saúde informada.');
      }

      const response = await secretariaApi.buscarNotificacao(
        cpf, unidadeSaude.tokenSecretaria,
      );

      const found = response
      && response.registros ? response.registros >= 1 : false;

      if (!found || !response.data) throw new Error(`Não foi possível buscar a notificação para o CPF: ${cpf}`);
      const [{ id }] = response.data;
      await repos.notificacaoCovid19Repository.atualizarTpTransmissaoApiSecretaria(
        notificacao.NotificacaoCovid19.id,
        id,
        tpTransmissaoApiSecretaria.values.Enviada,
      );
      let retorno = { success: 'Notificação sincronizada com sucesso.' };
      if (reenviar) {
        retorno = await reenviarNotificacao(notificacao, unidadeSaude, id);
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
  unidadeSaude, reenviar) => Promise.allSettled(
  notificacoes.map((n) => criarPromiseSincronizacaoNotificacao(n, unidadeSaude, reenviar)),
).then((res) => res.map((p) => (p.status === 'rejected' ? p.reason : p.value)));

exports.sincronizarNotificacoes = async (req, res, next) => {
  try {
    const {
      periodo, reenviar = false, limit = 500, page = 1,
    } = req.query;
    const { count, rows: notificacoes } = await repos.notificacaoRepository
      .getNotificacoesPorPeriodo(periodo, page, limit);
    const { email } = req.kauth.grant.access_token.content;
    const [unidadeUsuario] = await retornarUnidadeUsuarioLogado(email);
    const dataErrors = await SincronizarNotificacoesSecretariaSaude(
      notificacoes, unidadeUsuario, reenviar,
    );
    return res.json({ count, data: dataErrors });
  } catch (err) {
    return next(err);
  }
};
