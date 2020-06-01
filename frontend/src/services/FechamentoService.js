import http from './Http';

export default {
  findAll({
    page, itemsPerPage, search, sortBy, sortDesc,
  }) {
    let url = `/fechamento-notificacao-covid19?page=${page}&itemsPerPage=${itemsPerPage}
      &sortBy=${sortBy}&sortDesc=${sortDesc}`;
    if (search) {
      url = url.concat(`&dataFechamento=${search}`);
    }
    return http
      .get(url)
      .then(({ data }) => data);
  },
  getProximoFechamento() {
    return http.get('/fechamento-notificacao-covid19/proximo-fechamento').then(({ data }) => data.data);
  },
  getDetailsProximoFechamento({
    dataFechamento, page, itemsPerPage, sortBy, sortDesc,
  }) {
    let url = '/fechamento-notificacao-covid19/proximo-fechamento/detalhe';
    url += `?dataFechamento=${dataFechamento}&page=${page}&itemsPerPage=${itemsPerPage}`;
    url += `&sortBy=${sortBy}&sortDesc=${sortDesc}`;
    return http
      .get(url)
      .then(({ data }) => data);
  },
  postProximoFechamento(fechamento) {
    return http.post('/fechamento-notificacao-covid19/proximo-fechamento', fechamento);
  },
  reabrirFechamento(id) {
    return http.put(`/fechamento-notificacao-covid19/${id}`);
  },
};
