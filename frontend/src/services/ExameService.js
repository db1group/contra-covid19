import http from './Http';

export default {
  findAll(codigoMetodo, nome = '') {
    return http.get(`/exames?metodo=${codigoMetodo}&nome=${nome}`).then(({ data }) => data);
  },
};
