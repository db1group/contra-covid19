import DateService from '@/services/DateService';

export default class NotificacaoExportar {
  constructor(data = {}) {
    this.dataInicial = data.dataInicial || null;
    this.dataFinal = data.dataFinal || null;
    this.dataEvolucaoInicial = data.dataEvolucaoInicial || null;
    this.dataEvolucaoFinal = data.dataEvolucaoFinal || null;
    this.previa = data.previa || null;
  }

  toRequestBody() {
    return {
      dataInicial: this.dataInicial ? DateService.changeFormat(this.dataInicial, 'DD/MM/YYYY', 'YYYY-MM-DD') : '',
      dataFinal: this.dataFinal ? DateService.changeFormat(this.dataFinal, 'DD/MM/YYYY', 'YYYY-MM-DD') : '',
      dataEvolucaoInicial: this.dataEvolucaoInicial
        ? DateService.toMomentObject(this.dataEvolucaoInicial, 'DD/MM/YYYY HH:mm').toISOString()
        : '',
      dataEvolucaoFinal: this.dataEvolucaoFinal
        ? DateService.toMomentObject(this.dataEvolucaoFinal, 'DD/MM/YYYY HH:mm').toISOString()
        : '',
      previa: this.previa ? 'SIM' : 'NAO',
    };
  }
}
