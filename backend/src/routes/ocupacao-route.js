const express = require('express');

const router = express.Router();
const OcupacaoResource = require('../resource/ocupacacao-resource');

router.get('/ocupacoes', OcupacaoResource.consultaPorDescricao);

module.exports = router;
