import http from './Http';

export default {
  findAll(nome = '') {
    return http.get(`/unidades-saude?nome=${nome}`).then(({ data }) => data);
  },
  findAllHospitais(nome = '') {
    return http.get(`/unidades-saude?nome=${nome}&tipo=hospital`).then(({ data }) => data);
  },
  findAllLaboratorios(nome = '') {
    return http.get(`/unidades-saude?nome=${nome}&tipo=laboratorio`).then(({ data }) => data);
  },
  findByUserEmail(email = '') {
    return http.get(`/unidades-saude/userEmail/${email}`).then(({ data }) => data);
  },
  findAllUnidades({ page, itemsPerPage, search }) {
    return http
      .get(`/unidades-saude/consulta?page=${page}&itemsPerPage=${itemsPerPage}&search=${search}`)
      .then(({ data }) => data);
  },
  save(unidadeSaude) {
    return http.post('/unidades-saude', unidadeSaude);
  },
  update(id, unidadeSaude) {
    return http.put(`/unidades-saude/${id}`, unidadeSaude);
  },
  findById(id) {
    return http.get(`/unidades-saude/${id}`).then(({ data }) => data);
  },
  delete(id) {
    return http.delete(`/unidades-saude/${id}`);
  },
};
