const repos = require('../repositories/repository-factory');

exports.getNotificacoesPendentesEnvio = async () => {
  const notificacoes = repos.notificacaoCovid19Repository.getNotificacoesPendentesEnvioSecretaria();

  return notificacoes.map((data) => ({
    nomeUnidadeSaude: data.Notificacao.UnidadeSaude.nome,
  }));
};
