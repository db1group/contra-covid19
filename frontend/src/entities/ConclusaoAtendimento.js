import DateService from '@/services/DateService';

export default class ConclusaoAtendimento {
  constructor(data = {}) {
    this.situacaoNoMomentoDaNotificacao = data.situacaoNoMomentoDaNotificacao || null;
    this.coletaMaterialParaDiagnostico = data.coletaMaterialParaDiagnostico || false;
    this.laboratorioOficial = data.laboratorioOficial || false;
    this.laboratorioRedePrivada = data.laboratorioRedePrivada || false;
    this.dataDaColeta = data.dataDaColeta || '';
    this.metodoDeExame = data.metodoDeExame || null;
  }

  toRequestBody() {
    return {
      ...this,
      dataDaColeta: DateService.changeFormat(this.dataDaColeta, 'DD/MM/YYYY', 'YYYY-MM-DD'),
    };
  }
}
