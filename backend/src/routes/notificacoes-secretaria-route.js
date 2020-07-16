const express = require('express');

const router = express.Router();
const NotificacaoSecretariaSaudeResource = require('../resource/notificacao-secretaria-saude-resource');
// const { validate, schemas } = require('../validations');
const secure = require('../secure');
const { isRealmSecretariaSaude } = require('../lib/secureRealm');

const keycloack = secure();

const prefixoRoute = '/notificacoes-secretaria';

router.get(`${prefixoRoute}/pendentesEnvio`,
  keycloack.protect(isRealmSecretariaSaude),
  NotificacaoSecretariaSaudeResource.getPendentesEnvio);

router.post(`${prefixoRoute}/:id/enviar`,
  keycloack.protect(isRealmSecretariaSaude),
  NotificacaoSecretariaSaudeResource.enviarNotificacao);

router.post(`${prefixoRoute}/enviar`,
  keycloack.protect(isRealmSecretariaSaude),
  NotificacaoSecretariaSaudeResource.enviarNotificacoes);

router.post(`${prefixoRoute}/sincronizar`,
  keycloack.protect(isRealmSecretariaSaude),
  NotificacaoSecretariaSaudeResource.sincronizarNotificacoes);

module.exports = router;
