const express = require('express');

const router = express.Router();
const ProfissaoResource = require('../resource/profissao-resource');
const { validate, schemas } = require('../validations');

router.get('/profissoes',
  validate(schemas.profissao.consultaPorNome, 'query'),
  ProfissaoResource.consultaPorNome);

module.exports = router;
