export default class NotificacaoExportar {
  constructor(data = {}) {
    this.dataInicial = data.dataInicial || null;
    this.dataFinal = data.dataFinal || null;
  }
}
