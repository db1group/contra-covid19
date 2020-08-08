const express = require('express');

const router = express.Router();
const TenantConfigResource = require('../resource/tenant-config-resource');
const secure = require('../secure');
const { isRealmSupervisor } = require('../lib/secureRealm');

const keycloack = secure();
const prefixoRoute = '/config';

router.get(`${prefixoRoute}`,
  keycloack.protect(isRealmSupervisor),
  TenantConfigResource.consultarConfiguracoes);

router.get(`${prefixoRoute}/:id`,
  keycloack.protect(isRealmSupervisor),
  TenantConfigResource.getConfigById);

router.post(`${prefixoRoute}`,
  keycloack.protect(isRealmSupervisor),
  TenantConfigResource.cadastrarConfiguracao);

router.put(`${prefixoRoute}/:id`,
  keycloack.protect(isRealmSupervisor),
  TenantConfigResource.atualizarConfiguracao);

router.delete(`${prefixoRoute}/municipios/:id`,
  keycloack.protect(isRealmSupervisor),
  TenantConfigResource.removerMunicipio);

module.exports = router;
