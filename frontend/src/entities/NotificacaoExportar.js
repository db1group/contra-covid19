import DateService from '@/services/DateService';

export default class NotificacaoExportar {
  constructor(data = {}) {
    this.dataInicial = data.dataInicial || null;
    this.dataFinal = data.dataFinal || null;
  }

  toRequestBody() {
    return {
      dataInicial: DateService.changeFormat(this.dataInicial, 'DD/MM/YYYY', 'YYYY-MM-DD'),
      dataFinal: DateService.changeFormat(this.dataFinal, 'DD/MM/YYYY', 'YYYY-MM-DD'),
    };
  }
}
