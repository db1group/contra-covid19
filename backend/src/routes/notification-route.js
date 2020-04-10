const express = require("express");
const router = express.Router();
const NotificacaoResource = require("../resource/notificacao-resource");

router.post("/notificacoes", NotificacaoResource.salvar);
router.get("/notificacoes", NotificacaoResource.consultarPorData);
router.get("/notificacoes/:id", NotificacaoResource.consultarPorId);

module.exports = router;