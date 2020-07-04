const express = require('express');

const router = express.Router();
const NotificaLeitoPerfilResource = require('../resource/notifica-leito-perfil-resource');
const { validate, schemas } = require('../validations');
const secure = require('../secure');
const { isRealSecretariaOuUnidadeSaude } = require('../lib/secureRealm');

const keycloack = secure();
const prefixURL = '/notifica-leitos';

router.get(`${prefixURL}/:notificaLeitoId/perfil`,
  keycloack.protect(isRealSecretariaOuUnidadeSaude),
  validate(schemas.notificaLeitoPerfil.consultarPorLeito, 'params'),
  validate(schemas.notificaLeitoPerfil.consultar, 'query'),
  NotificaLeitoPerfilResource.consultarPorNotificaLeito);
router.get(`${prefixURL}/:notificaLeitoId/perfil/:id`,
  keycloack.protect(isRealSecretariaOuUnidadeSaude),
  validate(schemas.notificaLeitoPerfil.consultarId, 'params'),
  NotificaLeitoPerfilResource.consultarPorId);
router.post(`${prefixURL}/:notificaLeitoId/perfil`,
  keycloack.protect(isRealSecretariaOuUnidadeSaude),
  validate(schemas.notificaLeitoPerfil.consultarId, 'params'),
  validate(schemas.notificaLeitoPerfil.salvar),
  NotificaLeitoPerfilResource.cadastrar);
router.put(`${prefixURL}/:notificaLeitoId/perfil/:id`,
  keycloack.protect(isRealSecretariaOuUnidadeSaude),
  validate(schemas.notificaLeitoPerfil.consultarId, 'params'),
  validate(schemas.notificaLeitoPerfil.salvar),
  NotificaLeitoPerfilResource.atualizar);
router.delete(`${prefixURL}/:notificaLeitoId/perfil/:id`,
  keycloack.protect(isRealSecretariaOuUnidadeSaude),
  validate(schemas.notificaLeitoPerfil.consultarId, 'params'),
  NotificaLeitoPerfilResource.deletar);

module.exports = router;
