const express = require('express');

const router = express.Router();
const NotificacaoResource = require('../resource/notificacao-resource');
const NotificacaoEvolucaoResource = require('../resource/notificacao-evolucao-resource');
const { validate, schemas } = require('../validations');

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

router.get(`${prefixoRoute}/:id/evolucoes`, NotificacaoEvolucaoResource.consultar);
router.post(`${prefixoRoute}/:id/evolucoes`, NotificacaoEvolucaoResource.cadastrar);
router.delete(`${prefixoRoute}/:notificacaoId/evolucoes/:id`, NotificacaoEvolucaoResource.deletar);

module.exports = router;
