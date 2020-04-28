const situacoesModel = {
  ALTA_ISOLAMENTO_DOMICILIAR: 'Isolamento domiciliar',
  INTERNAMENTO_LEITO_COMUM: 'Leito comum',
  INTERNAMENTO_LEITO_UTI: 'UTI',
  EVOLUCAO_OBITO: 'Óbito',
};

const mapearSituacao = (situacao) => situacoesModel[situacao] || 'Isolamento domiciliar';

module.exports = (notificacoes) => notificacoes.map((n) => ({
  id: n.id,
  nome: n.Pessoa ? n.Pessoa.nome : '',
  documento: n.Pessoa ? n.Pessoa.numeroDocumento : '',
  dataNotificacao: n.NotificacaoCovid19 ? n.NotificacaoCovid19.dataHoraNotificacao : '',
  telefone: n.Pessoa ? n.Pessoa.telefoneContato : '',
  situacao: mapearSituacao(n.NotificacaoCovid19 ? n.NotificacaoCovid19.situacaoNoMomentoDaNotificacao : ''),
  unidade: n.UnidadeSaude ? n.UnidadeSaude.nome : '',
  status: n.status || '',
  createdAt: n.createdAt || '',
}));
