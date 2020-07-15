const { ValidationError } = require('sequelize');
const NotificaSaudeErro = require('./NotificaSaudeErro');

const tratarErrorsRetornoAPI = (response, erro) => {
  let codigoResposta = erro.isAxiosError ? 400 : 500;
  const errorAxios = erro.isAxiosError
  && erro.response && erro.data
  && erro.response.data.error
    ? erro.response.data.error
    : erro.response.data.errorMessage;

  const errorMessage = erro.isAxiosError ? errorAxios : erro.message;
  const objetoRetorno = {
    error: errorMessage || erro.message,
    stack: process.env.NODE_ENV === 'development' ? erro.stack : null,
  };

  if (erro instanceof ValidationError) {
    codigoResposta = 400;
    objetoRetorno.error = erro.errors.map((erros) => erros.message).join(',\n');
  }

  if (erro instanceof NotificaSaudeErro) {
    codigoResposta = erro.statusCode;
    objetoRetorno.error = erro.message;
  }

  return response.status(codigoResposta).json(objetoRetorno);
};

module.exports = { tratarErrorsRetornoAPI };
