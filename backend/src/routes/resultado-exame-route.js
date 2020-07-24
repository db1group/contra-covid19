const express = require('express');

const router = express.Router();
const ResultadoExameResource = require('../resource/resultado-exame-resource');

router.get('/resultados-exame', ResultadoExameResource.consultaPorNome);

module.exports = router;
