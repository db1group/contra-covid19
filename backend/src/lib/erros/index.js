const { tratarErrorsRetornoAPI } = require('./api-error-handling');
const RegraNegocioErro = require('./RegraNegocioErro');
const UsuarioNaoAutorizadoErro = require('./UsuarioNaoAutorizadoErro');

module.exports = {
  tratarErrorsRetornoAPI,
  RegraNegocioErro,
  UsuarioNaoAutorizadoErro,
};
