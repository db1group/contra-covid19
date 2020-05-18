const notificacaoRepository = require('./notificacao-repository');
const notificacaoCovid19Repository = require('./notificacao-covid19-repository');
const pessoaRepository = require('./pessoa-repository');
const unidadeSaudeRepository = require('./unidade-saude-repository');
const usuarioRepository = require('./usuario-repository');

class Repository {
  constructor() {
    const repos = this;
    repos.notificacaoRepository = notificacaoRepository;
    repos.notificacaoCovid19Repository = notificacaoCovid19Repository;
    repos.pessoaRepository = pessoaRepository;
    repos.unidadeSaudeRepository = unidadeSaudeRepository;
    repos.usuarioRepository = usuarioRepository;
  }
}

module.exports = new Repository();
