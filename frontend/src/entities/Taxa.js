export default class Taxa {
  constructor(data = {}) {
    this.id = data.id || null;
    this.dtfechamento = data.dtfechamento || '';
    this.positividade = data.positividade ? parseFloat(data.positividade) : null;
    this.ocupacao = data.ocupacao ? parseFloat(data.ocupacao) : null;
  }
}
