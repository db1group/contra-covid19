import http from './Http';

export default {
  save(taxa) {
    return http.post('/taxas/', taxa);
  },
  update(taxa) {
    const { id } = taxa;
    return http.put(`/taxas/${id}`, taxa);
  },
  findByDataFechamento(dataFechamento = '01/01/1900') {
    return http.get(`/taxas/${dataFechamento}`);
  },
};
