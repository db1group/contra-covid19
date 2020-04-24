import http from './Http';
import Configuration from '@/configuration';

export default {
  findAll() {
    return http.get(`/municipios/${Configuration.value('VUE_APP_MUNICIPIO_ID')}/bairros`).then(({ data }) => data);
  },
};
