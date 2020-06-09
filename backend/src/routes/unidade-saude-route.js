const express = require('express');

const router = express.Router();
const UnidadeSaudeResource = require('../resource/unidade-saude-resource');

router.get('/unidades-saude', UnidadeSaudeResource.consultaPorNome);
router.get('/unidades-saude/userEmail/:email', UnidadeSaudeResource.consultarPorUserEmail);
router.get('/unidades-saude/consulta', UnidadeSaudeResource.consultaUnidades);

module.exports = router;
