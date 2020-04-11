const express = require("express");
const router = express.Router();
const PessoaController = require("../resource/pessoa-resource");

router.get("/pessoas", PessoaController.listar);
router.get("/pessoas/:id", PessoaController.consultarPorId);

module.exports = router;
