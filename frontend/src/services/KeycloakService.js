import Keycloak from 'keycloak-js';
import Configuration from '@/configuration';

export default Keycloak({
  url: Configuration.value('VUE_APP_KEYCLOAK_URL'),
  realm: Configuration.value('VUE_APP_KEYCLOAK_REALM'),
  clientId: Configuration.value('VUE_APP_KEYCLOAK_CLIENT_ID'),
});
