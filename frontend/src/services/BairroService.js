import http from './Http';

export default {
  findAll() {
    return http.get('/municipios/fcf83c0a-8de6-43a5-9845-907f597f56ce/bairros').then(({ data }) => data);
  },
};
