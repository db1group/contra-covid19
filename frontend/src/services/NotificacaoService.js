import Configuration from '@/configuration';
import http from './Http';

export default {
  save(notificacaco) {
    return http.post('/notificacoes', notificacaco);
  },
  findAll({
    page, itemsPerPage, search, sortBy, sortDesc, status,
  }) {
    return http
      .get(`/notificacoes/consulta?page=${page}&itemsPerPage=${itemsPerPage}
        &sortBy=${sortBy}&sortDesc=${sortDesc}&status=${status}&search=${search}`)
      .then(({ data }) => data);
  },
  findById(notificacaoId) {
    return http
      .get(`/notificacoes/${notificacaoId}`)
      .then(({ data }) => data);
  },
  delete(id) {
    return http.delete(`/notificacoes/${id}`);
  },
  deleteLote(ids) {
    return http.delete('/notificacoes', { data: ids });
  },
  getExcelLink({ dataInicial, dataFinal }) {
    return `${Configuration
      .value('VUE_APP_BACKEND_URL')}/notificacao-gera-excel?dataInicial=${dataInicial}&dataFinal=${dataFinal}`;
  },
};
