import http from './Http';

export default {
  findByEmail(email = '') {
    return http.get(`/usuarios/email/${email}`).then(({ data }) => data);
  },
  findAll({ page, itemsPerPage, search }) {
    return http
      .get(`/usuarios/consulta?page=${page}&itemsPerPage=${itemsPerPage}&search=${search}`)
      .then(({ data }) => data);
  },
  save(usuario) {
    return http.post('/usuarios', usuario);
  },
  update(id, usuario) {
    return http.put(`/usuarios/${id}`, usuario);
  },
  findById(id) {
    return http.get(`/usuarios/${id}`).then(({ data }) => data);
  },
  delete(id) {
    return http.delete(`/usuarios/${id}`);
  },
  findAllPermissions() {
    return http.get('/keycloak/roles').then(({ data }) => data);
  },
};
