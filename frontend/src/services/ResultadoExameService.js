import http from './Http';

export default {
  findAll(nome = '') {
    return http.get(`/resultados-exame?nome=${nome}`).then(({ data }) => data);
  },
};
