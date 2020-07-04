import http from './Http';

export default {
  findAll(nome = '') {
    return http.get(`/paises?nome=${nome}`).then(({ data }) => data);
  },
};
