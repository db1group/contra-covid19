import http from './Http';

export default {
  save(controleLeitoPerfil, controleLeitoId) {
    return http.post(`/notifica-leitos/${controleLeitoId}/perfil`, controleLeitoPerfil);
  },

  findAllControleLeitosPerfilByControleLeito(controleLeitoId) {
    return http.get(`/notifica-leitos/${controleLeitoId}/perfil?`).then(({ data }) => data);
  },

  findByControleLeitoId(controleLeitoId, controleLeitoPerfilId) {
    return http.get(`/notifica-leitos/${controleLeitoId}/perfil/${controleLeitoPerfilId}`).then(({ data }) => data);
  },

  update(controleLeitoId, id, controleLeitoPerfil) {
    return http.put(`notifica-leitos/${controleLeitoId}/perfil/${id}`, controleLeitoPerfil);
  },

  delete(controleLeitoId, controleLeitoPerfilId) {
    return http.delete(`/notifica-leitos/${controleLeitoId}/perfil/${controleLeitoPerfilId}`);
  },
};
