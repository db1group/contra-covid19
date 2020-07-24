import DateService from '@/services/DateService';

export default class InformacoesComplementares {
  constructor(data = {}) {
    this.tamiflu = data.tamiflu || false;
    this.hidroxicloroquina = data.hidroxicloroquina || false;
    this.cloroquina = data.cloroquina || false;
    this.nomeMedicamento = data.nomeMedicamento || '';
    this.historicoDeViagem = data.historicoDeViagem || false;
    this.dataDaViagem = DateService.changeFormat(
      data.dataDaViagem,
      'YYYY-MM-DD',
      'DD/MM/YYYY',
    ) || '';
    this.localDaViagem = data.localDaViagem || '';
    this.recebeuVacinaDaGripeNosUltimosDozeMeses = data.recebeuVacinaDaGripeNosUltimosDozeMeses || '';
    this.dataRetornoLocal = DateService.changeFormat(
      data.dataRetornoLocal,
      'YYYY-MM-DD',
      'DD/MM/YYYY',
    ) || '';
    this.dataChegadaBrasil = DateService.changeFormat(
      data.dataChegadaBrasil,
      'YYYY-MM-DD',
      'DD/MM/YYYY',
    ) || '';
    this.dataChegadaUF = DateService.changeFormat(
      data.dataChegadaUF,
      'YYYY-MM-DD',
      'DD/MM/YYYY',
    ) || '';
    this.descritivoViagem = data.descritivoViagem || '';
  }

  toRequestBody() {
    return {
      ...this,
      dataDaViagem: DateService.changeFormat(this.dataDaViagem, 'DD/MM/YYYY', 'YYYY-MM-DD'),
      dataRetornoLocal: DateService.changeFormat(this.dataRetornoLocal, 'DD/MM/YYYY', 'YYYY-MM-DD'),
      dataChegadaBrasil: DateService.changeFormat(this.dataChegadaBrasil, 'DD/MM/YYYY', 'YYYY-MM-DD'),
      dataChegadaUF: DateService.changeFormat(this.dataChegadaUF, 'DD/MM/YYYY', 'YYYY-MM-DD'),
    };
  }
}
