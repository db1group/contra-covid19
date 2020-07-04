const repos = require('../repositories/repository-factory');

exports.getNotificacoesPendentesEnvio = async () => {

  const notificacoes = repos.notificacaoCovid19Repository.getNotificacoesPendentesEnvioSecretaria();

  const notificacoesPendentes = notificacoes.map((data) => {
    return {
      nomeUnidadeSaude: data.Notificacao.UnidadeSaude.nome
    }
  });

  return notificacoesPendentes;
};
