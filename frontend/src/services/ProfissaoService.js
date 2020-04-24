import http from './Http';

export default {
  findAll(nome = '') {
    if (nome) {
      return http.get(`/profissoes?nome=${nome}`).then(({ data }) => data);
    }
    return http.get('/profissoes').then(({ data }) => data);
  },
};
