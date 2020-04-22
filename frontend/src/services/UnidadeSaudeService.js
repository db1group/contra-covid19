import http from './Http';

export default {
  findAll() {
    return http.get('/unidades-saude?nome=').then(({ data }) => data);
  },
};
