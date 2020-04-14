const express = require("express");
const router = express.Router();
const PessoaController = require("../resource/pessoa-resource");
const { validate, schemas } = require("../validations");

router.get("/pessoas", PessoaController.listar);
router.get(
  "/pessoas/:id",
  validate(schemas.pessoa.consultarId, "params"),
  PessoaController.consultarPorId
);

router.post(
  "/pessoas",
  validate(schemas.pessoa.cadastrar),
  PessoaController.cadastrar
);

module.exports = router;
