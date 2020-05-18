const express = require('express');

const router = express.Router();
const NotificacaoExportacaoExcelResource = require('../resource/notificacao-exportacao-excel-resource');
const secure = require('../secure');
const { isRealmSecretariaSaude } = require('../lib/secureRealm');

const keycloack = secure();

router.get('/notificacao-gera-excel', keycloack.protect(isRealmSecretariaSaude), NotificacaoExportacaoExcelResource.gerarExcel);

module.exports = router;
