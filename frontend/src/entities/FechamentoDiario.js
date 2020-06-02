export default class FechamentoDiario {
  constructor(data = {}) {
    this.id = data.id || null;
    this.dataFechamento = data.dataFechamento || '';
    this.casosNotificados = data.casosNotificados || 0;
    this.acompanhados = data.acompanhados || 0;
    this.internados = data.internados || 0;
    this.casosEncerrados = data.casosEncerrados || 0;
    this.confirmados = data.confirmados || 0;
    this.curados = data.curados || 0;
    this.obitos = data.obitos || 0;
    this.confirmadosInternados = data.confirmadosInternados || 0;
    this.emIsolamentoDomiciliar = data.emIsolamentoDomiciliar || 0;
    this.createdAt = data.createdAt || '';
    this.updatedAt = data.updatedAt || '';
    this.status = data.status || 'FECHADO';
    this.descartados = data.obitos || 0;
  }
}
