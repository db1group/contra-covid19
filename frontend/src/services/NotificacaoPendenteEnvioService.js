import http from './Http';

export default {
  findAll() {
    return http.get('/notificacoes-secretaria/pendentesEnvio').then(({ data }) => data);
  },
  sendAll(data) {
    return http.post('/notificacoes-secretaria/enviar', data);
  },
};
