const express = require('express');

const router = express.Router();
const NotificacaoResource = require('../resource/notificacao-resource');
const { validate, schemas } = require('../validations');
const secure = require('../secure');
const { isRealmSecretariaSaude } = require('../lib/secureRealm');

const keycloack = secure();

const routeNotificacoes = '/notificacoes';

router.post(routeNotificacoes,
  validate(schemas.notificacao.cadastrar),
  NotificacaoResource.salvar);

router.get(routeNotificacoes, NotificacaoResource.consultarPaginado);
router.get('/notificacoes/consulta', NotificacaoResource.consultarNotificacoesWeb);
router.get('/notificacoes/:id', NotificacaoResource.consultarPorId);

router.delete('/notificacoes/:id', NotificacaoResource.excluirLogicamenteNotificacao);
router.delete(routeNotificacoes, NotificacaoResource.excluirLoteLogicamenteNotificacao);

router.get('/notificacoes/:id/evolucoes', keycloack.protect(isRealmSecretariaSaude), NotificacaoResource.consultarNotificacaoEvolucao);
router.post('/notificacoes/:id/evolucoes', keycloack.protect(isRealmSecretariaSaude), NotificacaoResource.salvarEvolucao);

module.exports = router;
