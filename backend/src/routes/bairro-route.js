const express = require("express");
const router = express.Router();
const BairroResource = require("../resource/bairro-resource");

router.get("/bairros", BairroResource.consultaPorNome);

module.exports = router;
