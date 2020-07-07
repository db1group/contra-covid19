const axios = require('axios');

const axiosInstance = axios.create({
  baseURL: `${process.env.SECRETARIA_SAUDE_API_URL}/`,
  timeout: 10000,
});

exports.enviarNotificacao = async (request, token) => {
  const data = JSON.stringify(request);

  return axiosInstance.post('v1/notificacao/', data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => error.response);
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
    .catch((error) => error.response);
};
