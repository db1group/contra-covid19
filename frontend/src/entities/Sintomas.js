export default class Sintomas {
  constructor(data = {}) {
    this.febreAferidaReferida = data.febreAferidaReferida || false;
    this.temperaturaFebre = data.temperaturaFebre || '';
    this.adinamiaFraqueza = data.adinamiaFraqueza || false;
    this.artralgia = data.artralgia || false;
    this.calafrios = data.calafrios || false;
    this.conjuntivite = data.conjuntivite || false;
    this.coriza = data.coriza || false;
    this.congestaoNasal = data.congestaoNasal || false;
    this.dificuldadeDeglutir = data.dificuldadeDeglutir || false;
    this.gangliosLinfaticos = data.gangliosLinfaticos || false;
    this.irritabilidadeOuConfusao = data.irritabilidadeOuConfusao || false;
    this.manchasVermelhas = data.manchasVermelhas || false;
    this.tosse = data.tosse || false;
    this.dorDeGarganta = data.dorDeGarganta || false;
    this.mialgia = data.mialgia || false;
    this.escarro = data.escarro || false;
    this.sibilo = data.sibilo || false;
    this.batimentoAsasNasais = data.batimentoAsasNasais || false;
    this.dispneia = data.dispneia || false;
    this.taquipneia = data.taquipneia || false;
    this.saturacaoDeOximetriaDePulso = data.saturacaoDeOximetriaDePulso || false;
    this.cianoseCentral = data.cianoseCentral || false;
    this.diminuicaoDePulsoPeriferico = data.diminuicaoDePulsoPeriferico || false;
    this.hipotensao = data.hipotensao || false;
    this.diarreia = data.diarreia || false;
    this.cefaleia = data.cefaleia || false;
    this.nauseaVomito = data.nauseaVomito || false;
    this.tiragemIntercostal = data.tiragemIntercostal || false;
    this.outros = data.outros || '';
    this.existemOutrosSintomas = !!data.outros || false;
  }
}
