import NotificacaoEvolucao from '@/entities/NotificacaoEvolucao';

export default class Evolucao {
  constructor(data = {}) {
    this.id = data.id || null;
    this.notificacaoId = data.notificacaoId || '';
    this.status = data.status || 'ABERTA';
    this.nome = data.Pessoa ? data.Pessoa.nome : '';
    this.documento = data.Pessoa ? data.Pessoa.numeroDocumento : '';
    this.telefone = data.Pessoa ? data.Pessoa.telefoneContato : '';
    this.items = data.NotificacaoEvolucaos || [];
  }

  toRequestBody() {
    return {
      ...this,
      items: this.items.map((i) => new NotificacaoEvolucao(i).toRequestBody()),
    };
  }
}
