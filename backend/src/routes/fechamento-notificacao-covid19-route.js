const express = require('express');

const router = express.Router();
const rateLimit = require('express-rate-limit');
const FechamentoNotificacaoCovid19Resource = require('../resource/fechamento-notificacao-covid19-resource');
const secure = require('../secure');
const { isRealmFechamento } = require('../lib/secureRealm');

const keycloack = secure();

const prefixoRoute = '/fechamento-notificacao-covid19';

const cadastrarProximoFechamentoLimiter = rateLimit({
  windowMs: 5 * 1000,
  max: 1,
  message: 'Cada fechamento deve ocorrer em um intervalo mínimo de 5 segundos.',
});

router.get(`${prefixoRoute}/proximo-fechamento/detalhe`,
  keycloack.protect(isRealmFechamento),
  FechamentoNotificacaoCovid19Resource.getDetalheProximoFechamento);
router.get(`${prefixoRoute}/proximo-fechamento`,
  keycloack.protect(isRealmFechamento),
  FechamentoNotificacaoCovid19Resource.consultarProximoDiaFechamento);
router.post(`${prefixoRoute}/proximo-fechamento`,
  cadastrarProximoFechamentoLimiter,
  keycloack.protect(isRealmFechamento),
  FechamentoNotificacaoCovid19Resource.cadastrarProximoFechamento);
router.get(`${prefixoRoute}`,
  keycloack.protect(isRealmFechamento),
  FechamentoNotificacaoCovid19Resource.consultarPaginado);
router.put(`${prefixoRoute}/:id`,
  keycloack.protect(isRealmFechamento),
  FechamentoNotificacaoCovid19Resource.reabrirFechamento);

module.exports = router;
