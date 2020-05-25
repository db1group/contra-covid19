const express = require('express');

const router = express.Router();
const FechamentoNotificacaoCovid19Resource = require('../resource/fechamento-notificacao-covid19-resource');

const prefixoRoute = '/fechamento-notificacao-covid19';

router.get(`${prefixoRoute}/proximo-fechamento/detalhe`, FechamentoNotificacaoCovid19Resource.getDetalheProximoFechamento);
router.get(`${prefixoRoute}/proximo-fechamento`, FechamentoNotificacaoCovid19Resource.consultarProximoDiaFechamento);
router.post(`${prefixoRoute}/proximo-fechamento`, FechamentoNotificacaoCovid19Resource.cadastrarProximoFechamento);
router.get(`${prefixoRoute}`, FechamentoNotificacaoCovid19Resource.consultarPaginado);

module.exports = router;
