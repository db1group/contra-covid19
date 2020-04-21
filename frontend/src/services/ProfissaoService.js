import http from './Http';

export default {
  findAll() {
    return http.get('/profissoes').then(({ data }) => data);
  },
};
