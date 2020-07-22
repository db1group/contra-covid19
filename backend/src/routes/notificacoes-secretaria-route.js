const express = require('express');

const router = express.Router();
const NotificacaoSecretariaSaudeResource = require('../resource/notificacao-secretaria-saude-resource');
// const { validate, schemas } = require('../validations');
const secure = require('../secure');
const { isRealmEnvioSecretaria } = require('../lib/secureRealm');

const keycloack = secure();

const prefixoRoute = '/notificacoes-secretaria';

router.get(`${prefixoRoute}/pendentesEnvio`,
  keycloack.protect(isRealmEnvioSecretaria),
  NotificacaoSecretariaSaudeResource.getPendentesEnvio);

router.post(`${prefixoRoute}/:id/enviar`,
  keycloack.protect(isRealmEnvioSecretaria),
  NotificacaoSecretariaSaudeResource.enviarNotificacao);

router.post(`${prefixoRoute}/enviar`,
  keycloack.protect(isRealmEnvioSecretaria),
  NotificacaoSecretariaSaudeResource.enviarNotificacoes);

router.post(`${prefixoRoute}/sincronizar`,
  keycloack.protect(isRealmEnvioSecretaria),
  NotificacaoSecretariaSaudeResource.sincronizarNotificacoes);

module.exports = router;
