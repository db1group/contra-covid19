import Utils from '@/services/Utils';
import DateService from '@/services/DateService';

export default class Pessoa {
  constructor(data = {}) {
    this.pessoaId = data.pessoaId || null;
    this.tipoDocumento = data.tipoDocumento || 'CPF';
    this.numeroDocumento = data.numeroDocumento || '';
    this.nome = data.nome || '';
    this.dataDeNascimento = data.dataDeNascimento || '';
    this.sexo = data.sexo || '';
    this.cep = data.cep || '';
    this.bairroId = data.bairroId || null;
    this.nomeDaMae = data.nomeDaMae || '';
    this.ocupacao = data.ocupacao || '';
    this.endereco = data.endereco || '';
    this.numero = data.numero || '';
    this.municipioId = data.municipioId || process.env.VUE_APP_MUNICIPIO_ID;
    this.telefoneResidencial = data.telefoneResidencial || '';
    this.telefoneContato = data.telefoneContato || '';
    this.telefoneCelular = data.telefoneCelular || '';
    this.gestante = data.gestante || '';
    this.racaCor = data.racaCor || 'IGNORADO';
  }

  toRequestBody() {
    return {
      ...this,
      dataDeNascimento: DateService.changeFormat(this.dataDeNascimento, 'DD/MM/YYYY', 'YYYY-MM-DD'),
      numeroDocumento: Utils.numbersOnly(this.numeroDocumento),
      cep: Utils.numbersOnly(this.cep),
      telefoneResidencial: Utils.numbersOnly(this.telefoneResidencial),
      telefoneContato: Utils.numbersOnly(this.telefoneContato),
      telefoneCelular: Utils.numbersOnly(this.telefoneCelular),
    };
  }
}
