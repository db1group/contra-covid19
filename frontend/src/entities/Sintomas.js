export default class Sintomas {
  constructor(data = {}) {
    this.febreAferidaReferida = data.febreAferidaReferida || false;
    this.temperaturaFebre = data.temperaturaFebre || '';
    this.adiamiaOuFraqueza = data.adiamiaOuFraqueza || false;
    this.artralgia = data.artralgia || false;
    this.calafrios = data.calafrios || false;
    this.conjuntivite = data.conjuntivite || false;
    this.coriza = data.coriza || false;
    this.congestaoNasal = data.congestaoNasal || false;
    this.dificuldadeDeglutir = data.dificuldadeDeglutir || false;
    this.gangliosLinfaticos = data.gangliosLinfaticos || false;
    this.irritabilidadeOuConfusao = data.irritabilidadeConfusao || false;
    this.manchasVermelhas = data.manchasVermelhas || false;
    this.tosseSeca = data.tosseSeca || false;
    this.dorDeGarganta = data.dorDeGarganta || false;
    this.mialgia = data.mialgia || false;
    this.tosseProdutiva = data.tosseProdutiva || false;
    this.sibilo = data.sibilo || false;
    this.desconfortoRespiratorio = data.desconfortoRespiratorio || false;
    this.dispneia = data.dispneia || false;
    this.taquipneia = data.taquipneia || false;
    this.saturacaoDeOximetriaDePulso = data.saturacaoDeOximetriaDePulso || false;
    this.cianoseCentral = data.cianoseCentral || false;
    this.diminuicaoDePulsoPeriferico = data.diminuicaoDePulsoPeriferico || false;
    this.hipotensao = data.hipotensao || false;
    this.diarreia = data.diarreia || false;
    this.cefaleia = data.cefaleia || false;
    this.nausea = data.nausea || false;
    this.vomito = data.vomito || false;
    this.tiragemIntercostal = data.tiragemIntercostal || false;
    this.outros = data.outros || '';
    this.existemOutrosSintomas = !!data.outros || false;
  }
}
