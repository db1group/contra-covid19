import DateService from '@/services/DateService';

export default class Hospitalizacao {
  constructor(data = {}) {
    this.hospitalizado = data.hospitalizado || false;
    this.cnesHospitalId = data.cnesHospitalId || null;
    this.nomeHospital = data.nomeHospital || null;
    this.internacaoSus = data.internacaoSus || null;
    this.tipoLeito = data.tipoLeito || null;
    this.dataInternamento = DateService.changeFormat(
      data.dataInternamento,
      'YYYY-MM-DD',
      'DD/MM/YYYY',
    ) || '';
    this.dataIsolamento = DateService.changeFormat(
      data.dataIsolamento,
      'YYYY-MM-DD',
      'DD/MM/YYYY',
    ) || '';
    this.dataAlta = DateService.changeFormat(
      data.dataAlta,
      'YYYY-MM-DD',
      'DD/MM/YYYY',
    ) || '';
    this.dataObito = DateService.changeFormat(
      data.dataObito,
      'YYYY-MM-DD',
      'DD/MM/YYYY',
    ) || '';
    this.numeroDo = data.numeroDo || null;
  }

  toRequestBody() {
    return {
      ...this,
      dataInternamento: DateService.changeFormat(this.dataInternamento, 'DD/MM/YYYY', 'YYYY-MM-DD'),
      dataIsolamento: DateService.changeFormat(this.dataIsolamento, 'DD/MM/YYYY', 'YYYY-MM-DD'),
      dataAlta: DateService.changeFormat(this.dataAlta, 'DD/MM/YYYY', 'YYYY-MM-DD'),
      dataObito: DateService.changeFormat(this.dataObito, 'DD/MM/YYYY', 'YYYY-MM-DD'),
    };
  }
}
