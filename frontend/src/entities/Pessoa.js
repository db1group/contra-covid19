import Utils from '@/services/Utils';
import DateService from '@/services/DateService';

const formatContactNumber = (contactNumber) => {
  if (!contactNumber) return '';
  if (contactNumber.length === 10) return Utils.telephoneMask(contactNumber);
  return Utils.cellphoneMask(contactNumber);
};

export default class Pessoa {
  constructor(data = {}) {
    this.pessoaId = data.pessoaId || null;
    this.tipoDocumento = data.tipoDocumento || 'CPF';
    this.numeroCpf = '';
    this.numeroDocumento = data.numeroDocumento || '';
    this.nome = data.nome || '';
    this.dataDeNascimento = DateService.changeFormat(
      data.dataDeNascimento,
      'YYYY-MM-DD',
      'DD/MM/YYYY',
    ) || '';
    this.sexo = data.sexo || '';
    this.cep = data.cep || '';
    this.bairroId = data.bairroId || null;
    this.nomeDaMae = data.nomeDaMae || '';
    this.ocupacao = data.ocupacao || '';
    this.ocupacaoId = data.ocupacaoId || null;
    this.endereco = data.endereco || '';
    this.numero = data.numero || '';
    this.complemento = data.complemento || '';
    this.municipioId = data.municipioId || null;
    this.telefoneResidencial = Utils.telephoneMask(data.telefoneResidencial) || '';
    this.telefoneContato = formatContactNumber(data.telefoneContato);
    this.telefoneCelular = Utils.cellphoneMask(data.telefoneCelular) || '';
    this.gestante = data.gestante === 'SIM' ? 'true' : 'false';
    this.tipoPeriodoGestacional = data.tipoPeriodoGestacional || null;
    this.racaCor = data.racaCor || 'IGNORADO';
    this.tipoClassificacaoPessoa = data.tipoClassificacaoPessoa || 'OUTRO';
    this.uf = data.uf || 'PR';
    this.bairroNome = data.bairro || '';
    this.municipioNome = data.municipio || '';

    if (this.tipoDocumento === 'CPF') {
      this.numeroCpf = Utils.cpfMask(data.numeroDocumento) || '';
    }
  }

  toRequestBody() {
    const body = {
      ...this,
      dataDeNascimento: DateService.changeFormat(this.dataDeNascimento, 'DD/MM/YYYY', 'YYYY-MM-DD'),
      numeroDocumento: Utils.numbersOnly(this.tipoDocumento === 'CPF' ? this.numeroCpf : this.numeroDocumento),
      cep: Utils.numbersOnly(this.cep),
      telefoneResidencial: Utils.numbersOnly(this.telefoneResidencial),
      telefoneContato: Utils.numbersOnly(this.telefoneContato),
      telefoneCelular: Utils.numbersOnly(this.telefoneCelular),
      gestante: this.aplicarCampoGestante(),
    };
    delete body.numeroCpf;
    return body;
  }

  aplicarCampoGestante() {
    if (this.sexo === 'M') {
      return 'NAO_APLICADO';
    }

    return this.gestante === 'true' ? 'SIM' : 'NAO';
  }
}
