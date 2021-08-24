const express = require('express');

const router = express.Router();
const rateLimit = require('express-rate-limit');
const FechamentoResource = require('../resource/fechamento-resource');
const secure = require('../secure');
const { isRealmFechamento } = require('../lib/secureRealm');

const keycloack = secure();

const prefixoRoute = '/fechamento';

const cadastrarProximoFechamentoLimiter = rateLimit({
  windowMs: 5 * 1000,
  max: 1,
  message: 'Cada fechamento deve ocorrer em um intervalo mínimo de 5 segundos.',
});

router.get(`${prefixoRoute}`,
  keycloack.protect(isRealmFechamento),
  FechamentoResource.consultarFechamentos);

router.get(`${prefixoRoute}/proximo`,
  keycloack.protect(isRealmFechamento),
  FechamentoResource.consultarProximoDiaFechamento);

router.get(`${prefixoRoute}/detalhes`,
  keycloack.protect(isRealmFechamento),
  FechamentoResource.getDetalheProximoFechamento);

router.post(`${prefixoRoute}/cadastrar`,
  cadastrarProximoFechamentoLimiter,
  keycloack.protect(isRealmFechamento),
  FechamentoResource.cadastrarProximoFechamento);

router.put(`${prefixoRoute}/:id`,
  keycloack.protect(isRealmFechamento),
  FechamentoResource.reabrirFechamento);

router.post(`${prefixoRoute}/manual`,
  keycloack.protect(isRealmFechamento),
  FechamentoResource.realizarFechamentoManual);

module.exports = router;
