const express = require('express');

const router = express.Router();
const MunicipioResource = require('../resource/municipio-resource');
const { validate, schemas } = require('../validations');

router.get('/municipios/:municipioId/bairros',
  validate(schemas.municipio.consultarBairrosDoMunicipio, 'params'),
  MunicipioResource.consultarBairrosDoMunicipio);

module.exports = router;
