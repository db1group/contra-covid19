import http from './Http';

export default {
  save(controleLeitoPerfil) {
    const { unidadeId } = controleLeitoPerfil;
    return http.post(`/notifica-leitos/${unidadeId}/perfil`, controleLeitoPerfil);
  },

  findAllControleLeitosByUnidadeSaude(controleLeitoPerfilId) {
    return http.get(`/notifica-leitos/${controleLeitoPerfilId}/perfil?`).then(({ data }) => data);
  },

  findByControleLeitoId(unidadeId, controleLeitoPerfilId) {
    return http.get(`/notifica-leitos/${unidadeId}/perfil/${controleLeitoPerfilId}`).then(({ data }) => data);
  },

  update(controleLeitoPerfil, controleLeitoId) {
    console.log(controleLeitoPerfil);
    const { perfilId } = controleLeitoPerfil;
    return http.put(`notifica-leitos/${controleLeitoId}/perfil/${perfilId}`, controleLeitoPerfil);
  },

  delete(unidadeId, controleLeitoPerfilId) {
    return http.delete(`/notifica-leitos/${unidadeId}/perfil/${controleLeitoPerfilId}`);
  },
};
