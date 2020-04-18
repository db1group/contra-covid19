const express = require('express');

const router = express.Router();
const NotificacaoResource = require('../resource/notificacao-resource');
const { validate, schemas } = require('../validations');

router.post('/notificacoes',
  validate(schemas.notificacao.cadastrar),
  NotificacaoResource.salvar);

router.get('/notificacoes', NotificacaoResource.consultarPaginado);
router.get('/notificacoes/consulta', NotificacaoResource.consultarNotificacoesWeb);
router.get('/notificacoes/:id', NotificacaoResource.consultarPorId);
router.get('/notificacoes/evolucao/:id', NotificacaoResource.consultarNotificacaoEvolucao);

router.delete('/notificacoes/:id', NotificacaoResource.excluirLogicamenteNotificacao);
router.delete('/notificacoes', NotificacaoResource.excluirLoteLogicamenteNotificacao);

module.exports = router;
