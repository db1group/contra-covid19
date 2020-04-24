import dotenv from 'dotenv';

dotenv.config();

export default class Configuration {
  static get CONFIG() {
    return {
      VUE_APP_BACKEND_URL: '$VUE_APP_BACKEND_URL',
      VUE_APP_KEYCLOAK_URL: '$VUE_APP_KEYCLOAK_URL',
      VUE_APP_KEYCLOAK_REALM: '$VUE_APP_KEYCLOAK_REALM',
      VUE_APP_KEYCLOAK_CLIENT_ID: '$VUE_APP_KEYCLOAK_CLIENT_ID',
      VUE_APP_MUNICIPIO_ID: '$VUE_APP_MUNICIPIO_ID',
    };
  }

  static value(name) {
    if (!(name in this.CONFIG)) {
      console.log(`Configuration: There is no key named ${name}`);
      return undefined;
    }

    const value = this.CONFIG[name];

    if (!value) {
      console.log(`Configuration: Value for ${name} is not defined`);
      return undefined;
    }

    if (value.startsWith('$VUE_APP_')) {
      const envName = value.substr(1);
      const envValue = process.env[envName];
      if (envValue) {
        return envValue;
      }
      console.log(`Configuration: Environment variable ${envName} is not defined`);
    }
    return value;
  }
}
