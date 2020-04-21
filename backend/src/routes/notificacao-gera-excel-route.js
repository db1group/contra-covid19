const express = require('express');

const router = express.Router();
const NotificacaoExportacaoExcelResource = require('../resource/notificacao-exportacao-excel-resource');

router.get('/notificacao-gera-excel', NotificacaoExportacaoExcelResource.gerarExcel);

module.exports = router;
