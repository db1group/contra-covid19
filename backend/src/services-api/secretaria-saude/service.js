const axios = require('axios');
const https = require('https');
const { getErrorMessage } = require('../../lib/erros/api-error-handling');

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

  console.info('URL Envio Secretaria: ', `${axiosInstance.defaults.baseURL}v1/notificacao/`);
  console.info('Envio Secretaria: ', data);
  console.info('Usando SSL: ', process.env.SECRETARIA_DISABLE_SSL);

  const disableSSL = process.env.SECRETARIA_DISABLE_SSL === 'true';
  if (disableSSL) {
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    header.httpsAgent = httpsAgent;
  }

  return axiosInstance.post('v1/notificacao', data, header)
    .then((response) => response.data)
    .catch(getErrorMessage);
};

exports.atualizarNotificacao = async (request, token) => {
  const data = JSON.stringify(request);

  return axiosInstance.put(`v1/notificacao/${request.id}`, data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch(getErrorMessage);
};

exports.buscarNotificacao = async (cpf, token) => axiosInstance.get(`v1/notificacao/cpf/${cpf}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response) => response.data)
  .catch(getErrorMessage);
