export default class ConclusaoAtendimento {
  constructor(data = {}) {
    this.isolamentoDomiciliar = data.isolamentoDomiciliar || false;
    this.leitoComum = data.leitoComum || false;
    this.leitoUti = data.leitoUti || false;
    this.prontoSocorroOuAtendimento = data.prontoSocorroOuAtendimento || false;
    this.coletaMaterialParaDiagnostico = data.coletaMaterialParaDiagnostico || false;
    this.laboratorioOficial = data.laboratorioOficial || false;
    this.laboratorioRedePrivada = data.laboratorioRedePrivada || false;
  }
}
