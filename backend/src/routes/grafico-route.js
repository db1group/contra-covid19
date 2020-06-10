const express = require('express');

const router = express.Router();
const GraficosResource = require('../resource/graficos-resource');

router.get('/boletim/grafico', GraficosResource.consultarBoletimGrafico);
router.get('/boletim/cards', GraficosResource.consultarBoletimCards);

module.exports = router;
