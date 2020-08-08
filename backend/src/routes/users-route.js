const express = require('express');

const router = express.Router();
const UserResource = require('../resource/user-resource');
const { validate, schemas } = require('../validations');

const prefixURL = '/usuarios';

router.get(`${prefixURL}/consulta`, UserResource.consultarUsuarios);
router.post(
  prefixURL,
  validate(schemas.user.create),
  UserResource.create,
);
router.get(
  `${prefixURL}/:id`,
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
  validate(schemas.user.update),
  UserResource.update,
);

router.delete(
  `${prefixURL}/:id`,
  validate(schemas.user.delete, 'params'),
  UserResource.delete,
);

router.get('/keycloak/usuarios', UserResource.getAllKeycloakUsers);
router.get('/keycloak/usuarios/:id/roles', UserResource.getUserRoles);
router.post('/keycloak/usuarios', UserResource.updateKeyckoakUsers);
router.get('/keycloak/roles', UserResource.getRoles);

module.exports = router;
