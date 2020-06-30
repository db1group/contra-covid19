const express = require('express');

const router = express.Router();
const PerfilResource = require('../resource/perfil-resource');
const { validate, schemas } = require('../validations');

router.get('/perfis',
  validate(schemas.perfil.consultaPorNome, 'query'),
  PerfilResource.consultaPorNome);
router.post('/perfis',
  validate(schemas.perfil.cadastrar),
  PerfilResource.cadastrar);

module.exports = router;
