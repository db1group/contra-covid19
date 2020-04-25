import NotificacaoEvolucao from '@/entities/NotificacaoEvolucao';

const getTelefone = (pessoa = {}) => {
  const {
    telefoneResidencial = '',
    telefoneContato = '',
    telefoneCelular = '',
  } = pessoa;
  let telefone = '';
  if (telefoneResidencial !== '') {
    telefone = telefoneResidencial;
  } else if (telefoneContato !== '') {
    telefone = telefoneContato;
  } else {
    telefone = telefoneCelular;
  }
  return telefone;
};

export default class Evolucao {
  constructor(data = {}) {
    this.id = data.id || null;
    this.status = data.status || 'ABERTA';
    this.nome = data.Pessoa ? data.Pessoa.nome : '';
    this.documento = data.Pessoa ? data.Pessoa.numeroDocumento : '';
    this.telefone = getTelefone(data.Pessoa || {});
    this.items = data.NotificacaoEvolucaos || [];
  }

  toRequestBody() {
    return {
      ...this,
      items: this.items.map((i) => new NotificacaoEvolucao(i).toRequestBody()),
    };
  }
}
