const express = require('express');

const router = express.Router();
const PaisResource = require('../resource/pais-resource');

router.get('/paises', PaisResource.consultaPorNome);

module.exports = router;
