export default class Evolucao {
  constructor(data = {}) {
    this.id = data.id || null;
    this.status = data.status || 'ABERTO';
    this.nome = data.Pessoa ? data.Pessoa.nome : '';
    this.documento = data.Pessoa ? data.Pessoa.numeroDocumento : '';
    this.telefone = data.Pessoa ? data.Pessoa.telefoneContato : '';
    this.items = data.NotificacaoEvolucaos || [];
  }
}
