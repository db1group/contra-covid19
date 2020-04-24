import Configuration from '@/configuration';
import http from './Http';

export default {
  findAll() {
    return http.get(`/municipios/${Configuration.value('VUE_APP_MUNICIPIO_ID')}/bairros`).then(({ data }) => data);
  },
  findAllPorMunicipio(municipioId, nome = '') {
    return http.get(`/bairros/${municipioId}?nome=${nome}`).then(({ data }) => data);
  },
};
