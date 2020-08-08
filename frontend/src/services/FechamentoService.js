import http from './Http';

export default {
  findAll({
    page, itemsPerPage, search,
  }) {
    let url = `/fechamento?page=${page}&itemsPerPage=${itemsPerPage}`;
    if (search) {
      url = url.concat(`&dataFechamento=${search}`);
    }
    return http
      .get(url)
      .then(({ data }) => data);
  },
  getProximoFechamento() {
    return http.get('/fechamento/proximo').then(({ data }) => data.data);
  },
  getDetailsProximoFechamento({
    dataFechamento, page, itemsPerPage, tpEvolucao,
  }) {
    let url = '/fechamento/detalhes';
    url += `?dataFechamento=${dataFechamento}&page=${page}&itemsPerPage=${itemsPerPage}`;
    url += `&tpEvolucao=${tpEvolucao}`;
    return http
      .get(url)
      .then(({ data }) => data);
  },
  postProximoFechamento(fechamento) {
    return http.post('/fechamento/cadastrar', fechamento);
  },
  reabrirFechamento(id) {
    return http.put(`/fechamento/${id}`);
  },
};
