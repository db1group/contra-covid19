const express = require('express');

const router = express.Router();
const NotificacaoResource = require('../resource/notificacao-resource');
const NotificacaoEvolucaoResource = require('../resource/notificacao-evolucao-resource');
const NotificacaoSecretariaSaudeResource = require('../resource/notificacao-secretaria-saude-resource');
const { validate, schemas } = require('../validations');
const secure = require('../secure');
const { isRealmSecretariaSaude } = require('../lib/secureRealm');

const keycloack = secure();

const prefixoRoute = '/notificacoes';

router.post(`${prefixoRoute}`,
  validate(schemas.notificacao.cadastrar),
  NotificacaoResource.salvar);

router.put(`${prefixoRoute}/:id`,
  validate(schemas.notificacao.cadastrar),
  NotificacaoResource.atualizar);

router.get(`${prefixoRoute}`, NotificacaoResource.consultarPaginado);
router.get(`${prefixoRoute}/consulta`, NotificacaoResource.consultarNotificacoesWeb);
router.get(`${prefixoRoute}/:id`, NotificacaoResource.consultarPorId);

router.delete(`${prefixoRoute}/:id`, NotificacaoResource.excluirLogicamenteNotificacao);
router.delete(`${prefixoRoute}`, NotificacaoResource.excluirLoteLogicamenteNotificacao);

router.get(`${prefixoRoute}/:id/evolucoes`, keycloack.protect(isRealmSecretariaSaude), NotificacaoEvolucaoResource.consultar);
router.post(`${prefixoRoute}/:id/evolucoes`, keycloack.protect(isRealmSecretariaSaude), NotificacaoEvolucaoResource.cadastrar);
router.delete(`${prefixoRoute}/:notificacaoId/evolucoes/:id`, keycloack.protect(isRealmSecretariaSaude), NotificacaoEvolucaoResource.deletar);

router.post(`${prefixoRoute}/:id/enviar-secretaria-saude`,
  NotificacaoSecretariaSaudeResource.enviarNotificacao);

module.exports = router;
