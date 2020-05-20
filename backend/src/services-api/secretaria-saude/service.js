const axios = require('axios');
const dicionarioValores = require('../secretaria-saude/models/dicionario-valores');

const axiosInstance = axios.create({
    baseURL: `${process.env.SECRETARIA_SAUDE_API_URL}/`,
    timeout: 1000,
    headers: {
        'Authorization': `Bearer ${process.env.SECRETARIA_SAUDE_API_TOKEN}`,
    }
});

exports.getNotificacaoPorId = async (id) => {
    const responseData = await axiosInstance.get(`v1/notificacao/id/${id}`)
        .then((response) => {
            const data = response.data
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);

            return data;
        })
        .catch((error) => {
            console.log(error);
        });

    const sim = dicionarioValores.possuiCpf.Sim;

    return responseData;
}