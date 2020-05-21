import http from './Http';

export default {
  findAll({
    page, itemsPerPage, search, sortBy, sortDesc,
  }) {
    return http
      .get(`/fechamento-notificacao-covid19?page=${page}&itemsPerPage=${itemsPerPage}
        &sortBy=${sortBy}&sortDesc=${sortDesc}&dataFechamento=${search}`)
      .then(({ data }) => data);
  },
  getProximoFechamento() {
    return http.get('/fechamento-notificacao-covid19/proximo-fechamento').then(({ data }) => data.data);
  },
  postProximoFechamento() {
    return http.post('/fechamento-notificacao-covid19/proximo-fechamento');
  },
};
