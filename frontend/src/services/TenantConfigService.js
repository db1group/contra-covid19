import http from './Http';

export default {
  findAll() {
    return http
      .get('/config')
      .then(({ data }) => data);
  },
  save(config) {
    return http.post('/config', config);
  },
  update(id, config) {
    return http.put(`/config/${id}`, config)
      .then(({ data }) => ({ ...data }));
  },
  findById(id) {
    return http.get(`/config/${id}`).then(({ data }) => data);
  },
  deleteMunicipio(tenantMunicipioId) {
    return http.delete(`/config/municipios/${tenantMunicipioId}`);
  },
};
