import http from './Http';

export default {
  findAll() {
    return http.get(`/municipios/${process.env.VUE_APP_MUNICIPIO_ID}/bairros`).then(({ data }) => data);
  },
};
