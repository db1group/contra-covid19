const notificacaoRepository = require('./notificacao-repository');
const notificacaoCovid19Repository = require('./notificacao-covid19-repository');
const pessoaRepository = require('./pessoa-repository');
const unidadeSaudeRepository = require('./unidade-saude-repository');
const fechamentoNotificacaoCovid19Repository = require('./fechamento-notificacao-covid19-repository');
const usuarioRepository = require('./usuario-repository');
const envioSecretariaRepository = require('./envio-secretaria-repository');

class Repository {
  constructor() {
    const repos = this;
    repos.notificacaoRepository = notificacaoRepository;
    repos.notificacaoCovid19Repository = notificacaoCovid19Repository;
    repos.pessoaRepository = pessoaRepository;
    repos.unidadeSaudeRepository = unidadeSaudeRepository;
    repos.fechamentoNotificacaoCovid19Repository = fechamentoNotificacaoCovid19Repository;
    repos.usuarioRepository = usuarioRepository;
    repos.envioSecretariaRepository = envioSecretariaRepository;
  }
}

module.exports = new Repository();
