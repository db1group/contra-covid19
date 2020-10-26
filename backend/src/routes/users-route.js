const express = require('express');

const router = express.Router();
const UserResource = require('../resource/user-resource');
const { validate, schemas } = require('../validations');
const secure = require('../secure');
const { isRealmSecretariaSaude, isRealmSecretariaSupervisor } = require('../lib/secureRealm');

const keycloack = secure();
const prefixURL = '/usuarios';

router.get(`${prefixURL}/consulta`,
  keycloack.protect(isRealmSecretariaSaude),
  UserResource.consultarUsuarios);
router.post(
  prefixURL,
  keycloack.protect(isRealmSecretariaSaude),
  validate(schemas.user.create),
  UserResource.create,
);
router.get(
  `${prefixURL}/:id`,
  keycloack.protect(isRealmSecretariaSaude),
  validate(schemas.user.get, 'params'),
  UserResource.get,
);
router.get(
  `${prefixURL}/email/:email`,
  validate(schemas.user.findByEmail, 'params'),
  UserResource.findByEmail,
);

router.put(
  `${prefixURL}/:id`,
  keycloack.protect(isRealmSecretariaSaude),
  validate(schemas.user.update),
  UserResource.update,
);

router.delete(
  `${prefixURL}/:id`,
  keycloack.protect(isRealmSecretariaSaude),
  validate(schemas.user.delete, 'params'),
  UserResource.delete,
);

router.get('/keycloak/usuarios',
  keycloack.protect(isRealmSecretariaSupervisor),
  UserResource.getAllKeycloakUsers);

router.get('/keycloak/usuarios/:id/roles',
  keycloack.protect(isRealmSecretariaSupervisor),
  UserResource.getUserRoles);

router.post('/keycloak/usuarios',
  keycloack.protect(isRealmSecretariaSupervisor),
  UserResource.updateKeyckoakUsers);

router.get('/keycloak/roles',
  keycloack.protect(isRealmSecretariaSupervisor),
  UserResource.getRoles);

module.exports = router;
