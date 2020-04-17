const situacoesModel = {
  ALTA_ISOLAMENTO_DOMICILIAR: 'Isolamento domiciliar',
  INTERNAMENTO_LEITO_COMUM: 'Leito comun',
  INTERNAMENTO_LEITO_UTI: 'UTI',
  EVOLUCAO_OBITO: 'Óbito',
};

const mapearSituacao = (situacao) => situacoesModel[situacao] || 'Isolamento domiciliar';

module.exports = (notificacoes) => notificacoes.map((n) => ({
  id: n.id,
  nome: n.Pessoa.nome,
  documento: n.Pessoa.numeroDocumento,
  dataNotificacao: n.NotificacaoCovid19.dataHoraNotificacao,
  telefone: n.Pessoa.telefoneContato,
  situacao: mapearSituacao(n.NotificacaoCovid19.situacaoNoMomentoDaNotificacao),
}));
