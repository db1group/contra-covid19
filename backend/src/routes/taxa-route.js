const express = require('express');

const router = express.Router();
const TaxaResource = require('../resource/taxa-resource');
const { validate, schemas } = require('../validations');
const secure = require('../secure');
const { isRealmSecretariaSupervisor } = require('../lib/secureRealm');

const keycloack = secure();

const prefixoRoute = '/taxas';

router.get(`${prefixoRoute}/:dataFechamento`, TaxaResource.obterTaxasPorDataFechamento);
router.post(`${prefixoRoute}`,
  keycloack.protect(isRealmSecretariaSupervisor),
  validate(schemas.taxa.cadastrar),
  TaxaResource.salvar);

router.put(`${prefixoRoute}/:id`, TaxaResource.update);

module.exports = router;
