import http from './Http';

export default {
  save(controleLeitoPerfil) {
    const { unidadeId } = controleLeitoPerfil;
    return http.post(`/notifica-leitos/${unidadeId}/perfil`, controleLeitoPerfil);
  },

  findAllControleLeitosByUnidadeSaude(unidadeId, nome = '') {
    return http.get(`/notifica-leitos/${unidadeId}/perfil?nome=${nome}`).then(({ data }) => data);
  },

  findByControleLeitoId(unidadeId, controleLeitoPerfilId) {
    return http.get(`/notifica-leitos/${unidadeId}/perfil/${controleLeitoPerfilId}`).then(({ data }) => data);
  },

  update(controleLeitoPerfil, controleLeitoPerfilId) {
    const { unidadeId } = controleLeitoPerfil;
    return http.put(`notifica-leitos/${unidadeId}/perfil/${controleLeitoPerfilId}`, controleLeitoPerfil);
  },

  delete(unidadeId, controleLeitoPerfilId) {
    return http.delete(`/notifica-leitos/${unidadeId}/perfil/${controleLeitoPerfilId}`);
  },
};
