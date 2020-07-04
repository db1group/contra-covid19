const express = require('express');

const router = express.Router();
const UnidadeSaudeResource = require('../resource/unidade-saude-resource');
const { validate, schemas } = require('../validations');
const secure = require('../secure');
const { isRealmSecretariaSaude, isRealSecretariaOuUnidadeSaude } = require('../lib/secureRealm');

const keycloack = secure();

const prefix = '/unidades-saude';

router.get(prefix, UnidadeSaudeResource.consultaPorNome);
router.get(`${prefix}/userEmail/:email`, UnidadeSaudeResource.consultarPorUserEmail);
router.get(`${prefix}/consulta`, UnidadeSaudeResource.consultaUnidades);
router.post(prefix,
  validate(schemas.unidadeSaude.cadastrar),
  keycloack.protect(isRealmSecretariaSaude),
  UnidadeSaudeResource.cadastrar);

router.put(`${prefix}/:id`,
  validate(schemas.unidadeSaude.cadastrar),
  keycloack.protect(isRealSecretariaOuUnidadeSaude),
  UnidadeSaudeResource.atualizar);

router.get(`${prefix}/:id`,
  keycloack.protect(isRealSecretariaOuUnidadeSaude),
  UnidadeSaudeResource.consultarPorId);

router.delete(`${prefix}/:id`,
  keycloack.protect(isRealmSecretariaSaude),
  UnidadeSaudeResource.deletar);

module.exports = router;
