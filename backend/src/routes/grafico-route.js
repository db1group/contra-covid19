const express = require('express');

const router = express.Router();
const GraficosResource = require('../resource/graficos-resource');

router.get('/boletim/grafico-diario', GraficosResource.consultarBoletimGraficoDiarioUltimos30Dias);
router.get('/boletim/grafico', GraficosResource.consultarBoletimGraficoUltimos30Dias);
router.get('/boletim/graficoPaginado', GraficosResource.consultarBoletimGraficoPaginado);
router.get('/boletim/cards', GraficosResource.consultarBoletimCards);
router.get('/boletim/media-movel', GraficosResource.consultarMediaMovelUltimos30Dias);

module.exports = router;
