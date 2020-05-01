import DateService from '@/services/DateService';

export default class InformacoesComplementares {
  constructor(data = {}) {
    this.tamiflu = data.tamiflu || false;
    this.hidroxicloroquina = data.hidroxicloroquina || false;
    this.nomeMedicamento = data.nomeMedicamento || '';
    this.historicoDeViagem = data.historicoDeViagem || false;
    this.dataDaViagem = DateService.changeFormat(
      data.dataDaViagem,
      'YYYY-MM-DD',
      'DD/MM/YYYY',
    ) || '';
    this.localDaViagem = data.localDaViagem || '';
    this.recebeuVacinaDaGripeNosUltimosDozeMeses = data.recebeuVacinaDaGripeNosUltimosDozeMeses || '';
  }

  toRequestBody() {
    return {
      ...this,
      dataDaViagem: DateService.changeFormat(this.dataDaViagem, 'DD/MM/YYYY', 'YYYY-MM-DD'),
    };
  }
}
