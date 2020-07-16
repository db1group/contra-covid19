const { ValidationError } = require('sequelize');
const NotificaSaudeErro = require('./NotificaSaudeErro');

const getErrorMessage = async (event) => {
  const { isAxiosError = false, response, message } = event;
  let messageError = message;
  if (isAxiosError && response && response.data) {
    const { error, errorMessage } = response.data;
    messageError = error || errorMessage;
    messageError = messageError || response.data;
  }
  return messageError || message;
};

const tratarErrorsRetornoAPI = (response, erro) => {
  let codigoResposta = erro.isAxiosError ? 400 : 500;
  const errorMessage = getErrorMessage(erro);

  const objetoRetorno = {
    error: errorMessage,
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

module.exports = { tratarErrorsRetornoAPI, getErrorMessage };
