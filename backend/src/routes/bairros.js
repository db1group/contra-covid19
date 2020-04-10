const express = require("express");
const router = express.Router();
const BairroController = require("../controllers/bairro");

router.get("/bairros", BairroController.consultaPorNome);

module.exports = router;
