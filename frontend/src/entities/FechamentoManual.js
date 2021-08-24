export default class FechamentoManual {
  constructor(data = {}) {
    this.dataFechamento = data.dataFechamento || '';
    this.suspeitos = data.suspeitos || 0;
    this.encerrados = data.encerrados || 0;
    this.recuperados = data.recuperados || 0;
    this.descartados = data.descartados || 0;
    this.casos = data.casos || [];
  }

  toRequestBody() {
    const fechamento = { ...this };

    return fechamento;
  }
}
