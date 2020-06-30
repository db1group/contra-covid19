const express = require('express');

const router = express.Router();
const NotificaLeitoResource = require('../resource/notifica-leito-resource');
const { validate, schemas } = require('../validations');
const secure = require('../secure');
const { isRealSecretariaOuUnidadeSaude } = require('../lib/secureRealm');

const keycloack = secure();
const prefixURL = '/unidades-saude';

router.get(`${prefixURL}/:unidadeSaudeId/notifica-leitos`,
  keycloack.protect(isRealSecretariaOuUnidadeSaude),
  validate(schemas.notificaLeito.consultarPorUnidade, 'params'),
  validate(schemas.notificaLeito.consultar, 'query'),
  NotificaLeitoResource.consultarPorUnidadeSaude);
router.get(`${prefixURL}/:unidadeSaudeId/notifica-leitos/:id`,
  keycloack.protect(isRealSecretariaOuUnidadeSaude),
  validate(schemas.notificaLeito.consultarId, 'params'),
  NotificaLeitoResource.consultarPorId);
router.post(`${prefixURL}/:unidadeSaudeId/notifica-leitos`,
  keycloack.protect(isRealSecretariaOuUnidadeSaude),
  validate(schemas.notificaLeito.consultarPorUnidade, 'params'),
  validate(schemas.notificaLeito.cadastrar),
  NotificaLeitoResource.cadastrar);
router.put(`${prefixURL}/:unidadeSaudeId/notifica-leitos/:id`,
  keycloack.protect(isRealSecretariaOuUnidadeSaude),
  validate(schemas.notificaLeito.consultarId, 'params'),
  validate(schemas.notificaLeito.atualizar),
  NotificaLeitoResource.atualizar);
router.delete(`${prefixURL}/:unidadeSaudeId/notifica-leitos/:id`,
  keycloack.protect(isRealSecretariaOuUnidadeSaude),
  validate(schemas.notificaLeito.consultarId, 'params'),
  NotificaLeitoResource.deletar);

module.exports = router;
