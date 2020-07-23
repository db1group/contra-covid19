import http from './Http';

export default {
  findAll(nome = '') {
    return http.get(`/exames?nome=${nome}`).then(({ data }) => data);
  },
};
