const express = require('express');

const router = express.Router();
const FatoEvolucaoResource = require('../resource/fato-evolucao.resource');

router.get('/fato-evolucao/resumo', FatoEvolucaoResource.consultarEvolucaoResumo);

module.exports = router;
