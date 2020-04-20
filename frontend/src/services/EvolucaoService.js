import http from './Http';

export default {
  save(evolucao) {
    return http.post('/notificacoes/evolucao', evolucao);
  },
  findByNotificacaoId(notificacaoId) {
    return http.get(`/notificacoes/evolucao/${notificacaoId}`).then(({ data }) => data);
  },
};
