export default class {
  constructor(data = {}) {
    return {
      pessoaId: data.pessoaId || null,
      nome: data.nome || '',
      dataDeNascimento: data.dataDeNascimento || null,
      sexo: data.sexo || null,
      bairroId: data.bairroId || null,
      nomeDaMae: data.nomeDaMae || '',
      ocupacao: data.ocupacao || '',
      endereco: data.endereco || '',
      numero: data.numero || '',
      bairro: data.bairro || null,
      municipioId: data.municipioId || null,
      telefoneResidencial: data.telefoneResidencial || '',
      telefoneContato: data.telefoneContato || '',
      telefoneCelular: data.telefoneCelular || '',
    };
  }
};
