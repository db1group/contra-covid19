import http from './Http';

export default {
  save(notificacaco) {
    return http.post('/notificacoes', notificacaco);
  },
  findAll() {
    return http.get('/notificacoes/consulta').then(({ data }) => data);
  },
};
