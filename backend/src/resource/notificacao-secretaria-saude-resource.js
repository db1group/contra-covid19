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

const criarPromiseEnvioNotificacao = (notificacao) => new Promise(
  // eslint-disable-next-line no-async-promise-executor
  async (resolve, reject) => {
    try {
      if (!notificacao.UnidadeSaude.tokenSecretaria) {
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
          request, notificacao.UnidadeSaude.tokenSecretaria,
        );
      } else {
        request.id = notificacao.NotificacaoCovid19.apiSecretariaId;
        // eslint-disable-next-line no-await-in-loop
        response = await secretariaApi.atualizarNotificacao(
          request, notificacao.UnidadeSaude.tokenSecretaria,
        );
      }

      if (response.success && response.success === 'true') {
      // eslint-disable-next-line no-await-in-loop
        await repos.notificacaoCovid19Repository.atualizarTpTransmissaoApiSecretaria(
          notificacao.NotificacaoCovid19.id,
          response.data.id,
          tpTransmissaoApiSecretaria.values.Enviada,
        );
        retorno = { success: 'Notificação enviada com sucesso.' };
      } else if (apiErrors.isFichaJaExiste(response.data)) {
        retorno = { message: `A notificação do paciente ${notificacao.Pessoa.nome} já possui cadastro.` };
      } else {
        retorno = { ...response.data };
      }
      return resolve({ id: notificacao.id, ...retorno });
    } catch (err) {
    // eslint-disable-next-line prefer-promise-reject-errors
      return reject({ id: notificacao.id, message: err.message });
    }
  },
);

const EnviarNotificacoesSecretariaSaude = (notificacoes) => Promise.allSettled(
  notificacoes.map((n) => criarPromiseEnvioNotificacao(n)),
).then((res) => res.map((p) => (p.status === 'rejected' ? p.reason : p.value)));

exports.enviarNotificacoes = async (req, res, next) => {
  try {
    const ids = req.body;
    const notificacoes = await repos.notificacaoRepository
      .getNotificacoesPendentesEnvioSecretariaPorIds(ids);

    const dataErrors = await EnviarNotificacoesSecretariaSaude(notificacoes);

    return res.json({ data: dataErrors });
  } catch (err) {
    return next(err);
  }
};
