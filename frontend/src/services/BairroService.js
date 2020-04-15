import http from './Http';

export default {
  findAll() {
    return http.get('/bairros?nome=').then(({ data }) => data);
  },
};
