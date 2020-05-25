const axios = require('axios');

const axiosInstance = axios.create({
    baseURL: `${process.env.SECRETARIA_SAUDE_API_URL}/`,
    timeout: 1000,
    headers: {
        'Authorization': `Bearer ${process.env.SECRETARIA_SAUDE_API_TOKEN}`,
    }
});

exports.enviarNotificacao = async (request) => {
    const data = JSON.stringify(request);

    const responseData = axiosInstance.post(`v1/notificacao/`, data)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response;
        });

    return responseData;
}