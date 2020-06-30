import DateService from '@/services/DateService';

export default class NotificacaoExportar {
  constructor(data = {}) {
    this.dataInicial = data.dataInicial || null;
    this.dataFinal = data.dataFinal || null;
    this.dataEvolucaoInicial = data.dataEvolucaoInicial || '';
    this.dataEvolucaoFinal = data.dataEvolucaoFinal || '';
  }

  toRequestBody() {
    return {
      dataInicial: DateService.changeFormat(this.dataInicial, 'DD/MM/YYYY', 'YYYY-MM-DD'),
      dataFinal: DateService.changeFormat(this.dataFinal, 'DD/MM/YYYY', 'YYYY-MM-DD'),
      dataEvolucaoInicial: DateService.toMomentObject(this.dataEvolucaoInicial, 'DD/MM/YYYY HH:mm').toISOString(),
      dataEvolucaoFinal: DateService.toMomentObject(this.dataEvolucaoFinal, 'DD/MM/YYYY HH:mm').toISOString(),
    };
  }
}
