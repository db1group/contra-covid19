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

  const httpsAgent = new https.Agent({ rejectUnauthorized: false });

  return axiosInstance.post('v1/notificacao/', data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      httpsAgent,
    })
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
