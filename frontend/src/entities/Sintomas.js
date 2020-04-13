export default class Sintomas {
  constructor(data = {}) {
    this.coriza = data.coriza || false;
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
    this.outros = data.outros || '';
  }
}
