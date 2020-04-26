import DateService from '@/services/DateService';

export default class ConclusaoAtendimento {
  constructor(data = {}) {
    this.situacaoNoMomentoDaNotificacao = data.situacaoNoMomentoDaNotificacao || null;
    this.coletaMaterialParaDiagnostico = data.coletaMaterialParaDiagnostico || false;
    this.tipoLaboratorio = data.tipoLaboratorio || null;
    this.nomeLaboratorioEnvioMaterial = data.nomeLaboratorioEnvioMaterial || '';
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
