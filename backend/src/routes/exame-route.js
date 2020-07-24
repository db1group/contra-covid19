const express = require('express');

const router = express.Router();
const ExameResource = require('../resource/exame-resource');

router.get('/exames', ExameResource.consultaPorNome);

module.exports = router;
