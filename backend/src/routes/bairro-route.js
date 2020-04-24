const express = require('express');

const router = express.Router();
const BairroResource = require('../resource/bairro-resource');

router.get('/bairros', BairroResource.consultaPorNome);

router.get('/bairros/:municipioId/', BairroResource.consultarNomeEMunicipio);

module.exports = router;
