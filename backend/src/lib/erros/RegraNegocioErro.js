const NotificaSaudeErro = require('./NotificaSaudeErro');

class RegraNegocioErro extends NotificaSaudeErro {
  constructor(message) {
    super(400, message);
  }
}

module.exports = RegraNegocioErro;
