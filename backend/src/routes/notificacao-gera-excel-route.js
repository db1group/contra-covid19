const express = require('express');

const router = express.Router();
const NotificacaoExportacaoExcelResource = require('../resource/gera-excel-notificacao-resource');
const NotificacaoExportarCSV = require('../resource/exportar-notificacoes');
const secure = require('../secure');
const { isRealmSecretariaSaude } = require('../lib/secureRealm');

const keycloack = secure();

router.get('/exportar/excel', keycloack.protect(isRealmSecretariaSaude), NotificacaoExportacaoExcelResource.gerarExcel);
router.get('/exportar/csv', keycloack.protect(isRealmSecretariaSaude), NotificacaoExportarCSV.exportarNotificacoes);

module.exports = router;
