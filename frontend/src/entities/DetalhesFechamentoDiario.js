export default class DetalhesFechamentoDiario {
  constructor(data = {}) {
    this.dataEvolucao = data.dataEvolucao || '';
    this.unidadeSaude = data.nomeUnidadeSaude || '';
    this.nome = data.nomePaciente || '';
    this.tpEvolucao = data.tpEvolucao || '';
  }
}
