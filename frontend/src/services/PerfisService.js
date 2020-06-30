import http from './Http';

export default {
  save(perfil) {
    return http.post(`/perfis`, perfil);
  },

  findAllControleLeitosByUnidadeSaude(unidadeId, nome = '') {
    return http.get(`/perfis?nome=${nome}`).then(({ data }) => data);
  },
};
