import axios from 'axios';
import keycloak from '@/services/KeycloakService';
import Configuration from '@/configuration';

const http = axios.create({
  baseURL: Configuration.value('VUE_APP_BACKEND_URL'),
});

http.interceptors.request.use((requestConfig) => new Promise((resolve) => {
  if (keycloak.authenticated) {
    keycloak.updateToken().then(() => {
      const config = requestConfig;
      config.headers.Authorization = `Bearer ${keycloak.token}`;
      resolve(config);
    });
    return;
  }
  resolve(requestConfig);
}));

export default http;
