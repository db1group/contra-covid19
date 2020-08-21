import http from './Http';

export default {
  findAll(codigoExame, nome = '') {
    return http.get(`/resultados-exame?exame=${codigoExame}&nome=${nome}`).then(({ data }) => data);
  },
};
