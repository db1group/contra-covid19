import http from './Http';

export default {
  save(controleLeito) {
    const { unidadeId } = controleLeito;
    return http.post(`/unidades-saude/${unidadeId}/notifica-leitos`, controleLeito);
  },

  findAllControleLeitosByUnidadeSaude(unidadeId, nome = '') {
    return http.get(`/unidades-saude/${unidadeId}/notifica-leitos?nome=${nome}`).then(({ data }) => data);
  },

  findByControleLeitoId(unidadeId, controleLeitoId) {
    return http.get(`/unidades-saude/${unidadeId}/notifica-leitos/${controleLeitoId}`).then(({ data }) => data);
  },

  update(controleLeito, controleLeitoId) {
    const { unidadeId } = controleLeito;
    return http.put(`unidades-saude/${unidadeId}/notifica-leitos/${controleLeitoId}`, controleLeito);
  },

  delete(unidadeId, controleLeitoId) {
    return http.delete(`/unidades-saude/${unidadeId}/notifica-leitos/${controleLeitoId}`);
  },
};
