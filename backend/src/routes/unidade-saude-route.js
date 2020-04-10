const express = require("express");
const router = express.Router();
const UnidadeSaudeResource = require("../resource/unidade-saude-resource");

router.get("/unidades-saude", UnidadeSaudeResource.consultaPorNome);

module.exports = router;
