import http from './Http';

export default {
  // findAll() {
  //   return http
  //     .get('http://www.mocky.io/v2/5ec2e9bb2f0000a61ac35700')
  //     .then(({ data }) => data);
  // },
  // getProximoFechamento() {
  //   return http.get('http://www.mocky.io/v2/5ec2eb213100007400608c47').then(({ data }) => data);
  // },
  findAll({
    page, itemsPerPage, search, sortBy, sortDesc, status,
  }) {
    return http
      .get(`/fechamento-notificacao-covid19?page=${page}&itemsPerPage=${itemsPerPage}
        &sortBy=${sortBy}&sortDesc=${sortDesc}&status=${status}&search=${search}`)
      .then(({ data }) => data);
  },
  getProximoFechamento() {
    return http.get('/fechamento-notificacao-covid19/proximo-fechamento').then(({ data }) => data.data);
  },
  postProximoFechamento() {
    return http.post('/fechamento-notificacao-covid19/proximo-fechamento');
  },
};
