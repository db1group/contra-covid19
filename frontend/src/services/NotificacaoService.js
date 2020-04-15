import http from './Http';

export default {
  save(notificacaco) {
    return http.post('/notificacoes', notificacaco);
  },
};
