export default class FechamentoDiario {
  constructor(data = {}) {
    this.dataFechamento = data.dataFechamento || '';
    this.unidadeSaude = data.unidadeSaude || '';
    this.nome = data.nome || '';
    this.tpEvolucao = data.tpEvolucao || '';
  }
}
