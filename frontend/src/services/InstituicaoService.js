import http from './Http';

export default {
  findAll(nome = '') {
    return http.get(`/instituicoes?nome=${nome}`).then(({ data }) => data);
  },
};
