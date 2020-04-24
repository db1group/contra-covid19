import http from './Http';

export default {
  findAll(nome = '') {
    return http.get(`/municipios?nome=${nome}`).then(({ data }) => data);
  },
};
