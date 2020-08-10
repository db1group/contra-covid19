const notificacaoRepository = require('./notificacao-repository');
const notificacaoCovid19Repository = require('./notificacao-covid19-repository');
const pessoaRepository = require('./pessoa-repository');
const unidadeSaudeRepository = require('./unidade-saude-repository');
const fechamentoNotificacaoCovid19Repository = require('./fechamento-notificacao-covid19-repository');
const usuarioRepository = require('./usuario-repository');
const exportaNotificacaoRepository = require('./exporta-notificacao-repository');
const municipioRepository = require('./municipio-repository');
const tenantConfigRepository = require('./tenant-config-repository');
const fechamentoRepository = require('./fechamento-repository');
const fatoRepository = require('./fato-repository');

class Repository {
  constructor() {
    const repos = this;
    repos.notificacaoRepository = notificacaoRepository;
    repos.notificacaoCovid19Repository = notificacaoCovid19Repository;
    repos.pessoaRepository = pessoaRepository;
    repos.unidadeSaudeRepository = unidadeSaudeRepository;
    repos.fechamentoNotificacaoCovid19Repository = fechamentoNotificacaoCovid19Repository;
    repos.usuarioRepository = usuarioRepository;
    repos.exportaNotificacaoRepository = exportaNotificacaoRepository;
    repos.municipioRepository = municipioRepository;
    repos.tenantConfigRepository = tenantConfigRepository;
    repos.fechamentoRepository = fechamentoRepository;
    repos.fatoRepository = fatoRepository;
  }
}

module.exports = new Repository();
