import NotificacaoEvolucao from '@/entities/NotificacaoEvolucao';

const getTelefone = (pessoa = {}) => {
  console.log(pessoa);
  const { telefoneResidencial, telefoneContato, telefoneCelular } = pessoa;
  let telefone = '';
  if (telefoneResidencial !== '') {
    console.log('telefoneResidencial');
    telefone = telefoneResidencial;
  } else if (telefoneContato !== '') {
    console.log('telefoneContato');
    telefone = telefoneContato;
  } else {
    console.log('telefoneCelular');
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
