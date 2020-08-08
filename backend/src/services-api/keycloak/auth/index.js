const KeycloakAPI = require('..');
const Redis = require('../../../redis');
const secureRoles = require('../../../secure/roles');

const KEYCLOAK_TOKEN = 'KEYCLOAK_TOKEN';
const ROLES_KEY = 'ROLES_KEY';
const USER_ROLES_KEY = 'USER_ROLES_KEY';
const EXPIRE_TOKEN = process.env.KEYCLOAK_EXPIRE || 350;

const redis = Redis();

const filterAppRoles = (includeSupervisor) => (r) => {
  const defaultFilter = r.name !== 'offline_access'
    && r.name !== 'uma_authorization';
  if (includeSupervisor) return defaultFilter;
  return defaultFilter && r.name !== secureRoles.values.Supervisor;
};

const getCacheKey = async (key) => redis.get(key).catch(() => undefined);

const setCacheKey = (key, value, expire = EXPIRE_TOKEN) => {
  redis.set(key, JSON.stringify(value), 'EX', expire)
    .catch(() => console.error(`Não foi possível setar o cache para a key: ${key}`));
};

exports.login = async () => {
  try {
    const cache = await getCacheKey(KEYCLOAK_TOKEN);
    if (cache) return JSON.parse(cache);

    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('client_id', 'admin-cli');
    params.append('username', 'admin');
    params.append('password', process.env.KEYCLOAK_PASSWORD);

    const response = await KeycloakAPI
      .post('realms/master/protocol/openid-connect/token', params)
      .then(({ data }) => data);

    setCacheKey(KEYCLOAK_TOKEN, response);

    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

exports.roles = async (token, includeSupervisor) => {
  try {
    const cache = await getCacheKey(ROLES_KEY);
    if (cache) return JSON.parse(cache);

    const response = await KeycloakAPI
      .get(`admin/realms/${process.env.KEYCLOAK_REALM}/roles`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      .then(({ data }) => data.filter(filterAppRoles(includeSupervisor)));

    setCacheKey(ROLES_KEY, response);

    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

exports.userRoles = async (id, token) => {
  try {
    const userKey = `${USER_ROLES_KEY}_${id}`;
    const cache = await getCacheKey(userKey);
    if (cache) return JSON.parse(cache);

    const response = await KeycloakAPI
      .get(`admin/realms/${process.env.KEYCLOAK_REALM}/users/${id}/role-mappings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      .then(({ data }) => data.realmMappings.filter(filterAppRoles(false)));

    setCacheKey(userKey, response);

    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
