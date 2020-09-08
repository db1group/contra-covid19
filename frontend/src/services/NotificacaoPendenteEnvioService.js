import http from './Http';

export default {
  findAll({ page, itemsPerPage, search }) {
    return http.get(
      `/notificacoes-secretaria/pendentesEnvio?page=${page}&itemsPerPage=${itemsPerPage}&search=${search}`,
    )
      .then(({ data }) => data);
  },
  sendAll(notificacoes) {
    return http.post('/notificacoes-secretaria/enviar', notificacoes).then(({ data }) => data);
  },
  sincronizarNotificacao(id) {
    return http.post(`/notificacoes-secretaria/${id}/sincronizar`, {})
      .then(({ data }) => data);
  },
};
