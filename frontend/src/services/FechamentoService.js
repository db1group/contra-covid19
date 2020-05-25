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
    page, itemsPerPage, sortBy, sortDesc,
  }) {
    let url = '/fechamento-notificacao-covid19/proximo-fechamento/detalhe';
    url += `?page=${page}&itemsPerPage=${itemsPerPage}&sortBy=${sortBy}&sortDesc=${sortDesc}`;
    return http
      .get(url)
      .then(({ data }) => data);
  },
  postProximoFechamento() {
    return http.post('/fechamento-notificacao-covid19/proximo-fechamento');
  },
};
