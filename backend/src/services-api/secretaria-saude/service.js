const axios = require('axios');
const https = require('https');
const { getErrorMessage } = require('../../lib/erros/api-error-handling');

const URL_ENVIO_LABEL = 'URL Envio Secretaria: ';
const DESABILITADO_SSL = 'Desabilitado SSL: ';

const axiosInstance = axios.create({
  baseURL: `${process.env.SECRETARIA_SAUDE_API_URL}/`,
  timeout: process.env.TIMEOUT_SECRETARIA
    ? parseInt(process.env.TIMEOUT_SECRETARIA, 10)
    : 10000,
});

exports.enviarNotificacao = async (request, token) => {
  const data = JSON.stringify(request);
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.info(URL_ENVIO_LABEL, `${axiosInstance.defaults.baseURL}v1/notificacao/`);
  console.info('Envio Secretaria: ', data);
  console.info(DESABILITADO_SSL, process.env.SECRETARIA_DISABLE_SSL);

  const disableSSL = process.env.SECRETARIA_DISABLE_SSL === 'true';
  if (disableSSL) {
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    header.httpsAgent = httpsAgent;
  }

  return axiosInstance.post('v1/notificacao/', data, header)
    .then((response) => response.data)
    .catch(getErrorMessage);
};

exports.atualizarNotificacao = async (request, token) => {
  const data = JSON.stringify(request);
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.info(URL_ENVIO_LABEL, `${axiosInstance.defaults.baseURL}v1/notificacao/${request.id}`);
  console.info('Envio atualização Secretaria: ', data);
  console.info(DESABILITADO_SSL, process.env.SECRETARIA_DISABLE_SSL);

  const disableSSL = process.env.SECRETARIA_DISABLE_SSL === 'true';
  if (disableSSL) {
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    header.httpsAgent = httpsAgent;
  }

  return axiosInstance.put(`v1/notificacao/${request.id}`, data, header)
    .then((response) => response.data)
    .catch(getErrorMessage);
};

exports.buscarNotificacao = async (cpf, token) => {
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.info('URL Busca Secretaria: ', `${axiosInstance.defaults.baseURL}v1/notificacao/cpf/${cpf}`);
  console.info('Busca Notificação Secretaria por CPF: ', cpf);
  console.info(DESABILITADO_SSL, process.env.SECRETARIA_DISABLE_SSL);

  const disableSSL = process.env.SECRETARIA_DISABLE_SSL === 'true';
  if (disableSSL) {
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    header.httpsAgent = httpsAgent;
  }

  return axiosInstance.get(`v1/notificacao/cpf/${cpf}`, header)
    .then((response) => response.data)
    .catch(getErrorMessage);
};

exports.buscarNotificacaoSemCPF = async (nome, dataDeNascimento, nomeDaMae, token) => {
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.info('URL Busca Secretaria: ',
    `${axiosInstance.defaults.baseURL}v1/notificacao/pacientesemcpf/${nome}/${dataDeNascimento}/${nomeDaMae}`);
  console.info('Busca Notificação Secretaria sem CPF: ',
    nome, dataDeNascimento, nomeDaMae);
  console.info(DESABILITADO_SSL, process.env.SECRETARIA_DISABLE_SSL);

  const disableSSL = process.env.SECRETARIA_DISABLE_SSL === 'true';
  if (disableSSL) {
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    header.httpsAgent = httpsAgent;
  }

  return axiosInstance
    .get(`v1/notificacao/pacientesemcpf/${nome}/${dataDeNascimento}/${nomeDaMae}`, header)
    .then((response) => response.data)
    .catch(getErrorMessage);
};
