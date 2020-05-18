const NotificaSaudeErro = require('./NotificaSaudeErro');

class UsuarioNaoAutorizadoErro extends NotificaSaudeErro {
  constructor(message) {
    super(403, message);
  }
}

module.exports = UsuarioNaoAutorizadoErro;
