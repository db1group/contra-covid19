const { ValidationError } = require('sequelize');
const NotificaSaudeErro = require('./NotificaSaudeErro');

const tratarErrorsRetornoAPI = (response, erro) => {
  let codigoResposta = 500;
  const objetoRetorno = {
    error: erro.message,
    stack: process.env.NODE_ENV === 'development' ? erro.stack : null,
  };

  if (erro instanceof ValidationError) {
    const errorMessage = erro.errors.map((erros) => erros.message).join(',\n');
    codigoResposta = 400;
    objetoRetorno.error = errorMessage;
  }

  if (erro instanceof NotificaSaudeErro) {
    const errorMessage = erro.message;
    codigoResposta = erro.statusCode;
    objetoRetorno.error = errorMessage;
  }

  return response.status(codigoResposta).json(objetoRetorno);
};

module.exports = { tratarErrorsRetornoAPI };
