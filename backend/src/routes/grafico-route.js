const express = require('express');

const router = express.Router();
const GraficosResource = require('../resource/graficos-resource');

router.get('/boletim/grafico', GraficosResource.consultarBoletimGraficoUltimos30Dias);
router.get('/boletim/graficoPaginado', GraficosResource.consultarBoletimGraficoPaginado);
router.get('/boletim/cards', GraficosResource.consultarBoletimCards);

module.exports = router;
