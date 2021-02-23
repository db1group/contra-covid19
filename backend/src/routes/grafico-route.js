const express = require('express');

const router = express.Router();
const GraficosResource = require('../resource/graficos-resource');

router.get('/boletim/grafico-diario', GraficosResource.consultarBoletimGraficoDiario);
router.get('/boletim/grafico', GraficosResource.consultarBoletimGrafico);
router.get('/boletim/graficoPaginado', GraficosResource.consultarBoletimGraficoPaginado);
router.get('/boletim/cards', GraficosResource.consultarBoletimCards);
router.get('/boletim/media-movel', GraficosResource.consultarMediaMovel);
router.get('/boletim/grafico-faixaetaria', GraficosResource.consultaBoletimFaixaEtaria);
router.get('/boletim/resultado-testes', GraficosResource.consultaBoletimTestesCovid);

module.exports = router;
