import http from './Http';

export default {
  save(notificacaco) {
    return http.post('/notificacoes', notificacaco);
  },
  findAll({ page, itemsPerPage, search }) {
    return http.get(`/notificacoes/consulta?page=${page}&itemsPerPage=${itemsPerPage}&search=${search}`)
      .then(({ data }) => data);
  },
  delete(id) {
    return http.delete(`/notificacoes/${id}`);
  },
  deleteLote(ids) {
    return http.delete('/notificacoes', { data: ids });
  },
};
