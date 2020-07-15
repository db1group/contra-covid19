const axios = require('axios');

const axiosInstance = axios.create({
  baseURL: `${process.env.KEYCLOAK_URL}/`,
  timeout: process.env.KEYCLOAK_TIMEOUT ? parseInt(process.env.KEYCLOAK_TIMEOUT, 10) : 5000,
});

module.exports = axiosInstance;
