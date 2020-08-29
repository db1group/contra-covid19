const express = require('express');

const router = express.Router();
const InstituicaoResource = require('../resource/instituicao-resource');

router.get('/instituicoes', InstituicaoResource.consultaPorNome);

module.exports = router;
