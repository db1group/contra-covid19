/* eslint-disable no-param-reassign */
const KeycloakAPI = require('..');
const AuthAPI = require('../auth');

const getToken = async (token) => {
  if (!token) {
    return AuthAPI.login().then((t) => t.access_token);
  }
  return token;
};

exports.listarUsuarios = async (search = '', token) => {
  try {
    token = await getToken(token);

    return KeycloakAPI.get(`admin/realms/notificasaude/users?search=${search}&first=0&max=-1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => data);
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

exports.listarRoles = async (token) => {
  try {
    token = await getToken(token);

    return AuthAPI.roles(token);
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

exports.listarUserRoles = async (id, token) => {
  try {
    token = await getToken(token);

    return AuthAPI.userRoles(id, token);
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

exports.create = async (nome, email, token, tenant) => {
  try {
    token = await getToken(token);

    return KeycloakAPI.post('admin/realms/notificasaude/users',
      {
        enabled: true,
        attributes: { tenant },
        username: email,
        emailVerified: true,
        email,
        firstName: nome,
        lastName: '',
        credentials: [{ type: 'password', value: 'covid19', temporary: false }],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => data);
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

exports.update = async ({
  id, nome, token, tenant,
}) => {
  try {
    token = await getToken(token);
    const userParams = {
      firstName: nome,
      lastName: '',
    };
    if (tenant) {
      userParams.attributes = { tenant };
    }

    return KeycloakAPI.put(`admin/realms/notificasaude/users/${id}`,
      userParams,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => data);
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

exports.delete = async (id, token) => {
  try {
    token = await getToken(token);

    return KeycloakAPI.delete(`admin/realms/notificasaude/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch(({ response }) => response.data);
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};


exports.resetPassword = async (id, token) => {
  try {
    token = await getToken(token);

    return KeycloakAPI.put(`admin/realms/notificasaude/users/${id}/reset-password`,
      { type: 'password', value: 'covid19', temporary: false },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => data);
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

exports.joinRoles = async ({
  userId, permissions = [], token, removeRoles = false, includeSupervisor = false,
}) => {
  try {
    token = await getToken(token);

    const roles = await AuthAPI.roles(token, includeSupervisor);
    if (removeRoles) {
      const rolesToDelete = roles.filter((r) => !permissions.includes(r.name))
        .map((r) => ({ id: r.id, name: r.name }));
      await KeycloakAPI.delete(`admin/realms/notificasaude/users/${userId}/role-mappings/realm`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: rolesToDelete,
        });
    }

    const userRoles = roles.filter((r) => permissions.includes(r.name))
      .map((r) => ({ id: r.id, name: r.name }));
    return KeycloakAPI.post(`admin/realms/notificasaude/users/${userId}/role-mappings/realm`,
      userRoles,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => data);
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};
