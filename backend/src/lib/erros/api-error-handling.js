const { ValidationError } = require('sequelize');
const NotificaSaudeErro = require('./NotificaSaudeErro');

const tratarErrorsRetornoAPI = (response, erro) => {
  let codigoResposta = erro.isAxiosError ? 400 : 500;
  const errorAxios = erro.isAxiosError
  && erro.response
  && erro.response.data.error
    ? erro.response.data.error
    : erro.response.data.errorMessage;
  const objetoRetorno = {
    error: erro.isAxiosError
      ? errorAxios || erro
      : erro.message,
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
