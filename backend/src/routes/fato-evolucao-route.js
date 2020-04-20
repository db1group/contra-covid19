const express = require('express');

const router = express.Router();
const FatoEvolucaoResource = require('../resource/fato-evolucao.resource');
const FatoEvolucaoDiariaResource = require('../resource/fato-evolucao-diaria.resource');

router.get('/fato-evolucao/resumo', FatoEvolucaoResource.consultarEvolucaoResumo);
router.get('/fato-evolucao/diaria', FatoEvolucaoDiariaResource.consultarEvolucaoDiaria);

module.exports = router;
