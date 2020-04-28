import http from './Http';

export default {
  findAllPorMunicipio(municipioId, nome = '') {
    return http.get(`/municipios/${municipioId}/bairros?nome=${nome}`).then(({ data }) => data);
  },
};
