import http from './Http';

import DownloadService from './DownloadService';

export default {
  save(notificacaco) {
    return http.post('/notificacoes', notificacaco);
  },
  update(id, notificacaco) {
    return http.put(`/notificacoes/${id}`, notificacaco);
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
  downloadNotificacoes(filename) {
    const time = new Date().getTime();
    return DownloadService.downloadFile(`/notificacao-download/${filename}`,
      `notificacoes-${time}.xlsx`);
  },
  getDownloadFilename({ dataInicial, dataFinal }) {
    return http
      .get(`/notificacao-gera-excel?dataInicial=${dataInicial}&dataFinal=${dataFinal}`)
      .then(({ data }) => data);
  },
};
