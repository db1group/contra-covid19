const express = require('express');

const router = express.Router();
const FechamentoNotificacaoCovid19Resource = require('../resource/fechamento-notificacao-covid19-resource');
const secure = require('../secure');
const { isRealmFechamento } = require('../lib/secureRealm');

const keycloack = secure();

const prefixoRoute = '/fechamento-notificacao-covid19';

router.get(`${prefixoRoute}/proximo-fechamento/detalhe`,
  keycloack.protect(isRealmFechamento),
  FechamentoNotificacaoCovid19Resource.getDetalheProximoFechamento);
router.get(`${prefixoRoute}/proximo-fechamento`,
  keycloack.protect(isRealmFechamento),
  FechamentoNotificacaoCovid19Resource.consultarProximoDiaFechamento);
router.post(`${prefixoRoute}/proximo-fechamento`,
  keycloack.protect(isRealmFechamento),
  FechamentoNotificacaoCovid19Resource.cadastrarProximoFechamento);
router.get(`${prefixoRoute}`,
  keycloack.protect(isRealmFechamento),
  FechamentoNotificacaoCovid19Resource.consultarPaginado);
router.put(`${prefixoRoute}/:id`,
  keycloack.protect(isRealmFechamento),
  FechamentoNotificacaoCovid19Resource.reabrirFechamento);

module.exports = router;
