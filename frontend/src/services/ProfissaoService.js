import http from './Http';

export default {
  findAll(nome = '') {
    return http.get(`/profissoes?nome=${nome}`).then(({ data }) => data);
  },
};
