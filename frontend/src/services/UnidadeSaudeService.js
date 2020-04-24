import http from './Http';

export default {
  findAll(nome = '') {
    return http.get(`/unidades-saude?nome=${nome}`).then(({ data }) => data);
  },
};
