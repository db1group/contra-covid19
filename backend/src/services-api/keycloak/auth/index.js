const KeycloakAPI = require('..');
const Redis = require('../../../redis');

const KEYCLOAK_TOKEN = 'KEYCLOAK_TOKEN';
const EXPIRE_TOKEN = process.env.KEYCLOAK_EXPIRE || 350;

const redis = Redis();

const filterAppRoles = (r) => r.name !== 'offline_access' && r.name !== 'uma_authorization';

const getKeycloakToken = async () => {
  let token;
  try {
    token = await redis.get(KEYCLOAK_TOKEN);
  } catch (err) {
    console.error(err);
  }
  return token;
};
const setKeycloakToken = (response) => {
  try {
    redis.set(KEYCLOAK_TOKEN, JSON.stringify(response), 'EX', EXPIRE_TOKEN);
  } catch (err) {
    console.error(err);
  }
};

exports.login = async () => {
  try {
    const cache = await getKeycloakToken();
    if (cache) return JSON.parse(cache);

    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('client_id', 'admin-cli');
    params.append('username', 'admin');
    params.append('password', process.env.KEYCLOAK_PASSWORD);

    const response = await KeycloakAPI
      .post('realms/master/protocol/openid-connect/token', params)
      .then(({ data }) => data);

    setKeycloakToken(response);

    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

exports.roles = async (token) => KeycloakAPI
  .get(`admin/realms/${process.env.KEYCLOAK_REALM}/roles`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  .then(({ data }) => data.filter(filterAppRoles));

exports.userRoles = async (id, token) => KeycloakAPI
  .get(`admin/realms/${process.env.KEYCLOAK_REALM}/users/${id}/role-mappings`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  .then(({ data }) => data.realmMappings.filter(filterAppRoles));
