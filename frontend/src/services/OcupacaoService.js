import http from './Http';

export default {
  findAll(descricao = '') {
    return http.get(`/ocupacoes?descricao=${descricao}`).then(({ data }) => data);
  },
};
