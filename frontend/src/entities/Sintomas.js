import Utils from '@/services/Utils';

export default class Sintomas {
  constructor(data = {}) {
    this.febreAferidaReferida = data.febreAferidaReferida || false;
    this.temperaturaFebre = data.temperaturaFebre ? data.temperaturaFebre.replace('.', ',') : '';
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
    this.perdaOlfatoPaladar = data.perdaOlfatoPaladar || false;
    this.outros = data.outros || '';
    this.existemOutrosSintomas = !!data.outros || false;
  }

  toRequestBody() {
    return {
      ...this,
      temperaturaFebre: this.aplicarTemperaturaFebre(),
    };
  }

  limparSintomas() {
    this.febreAferidaReferida = false;
    this.temperaturaFebre = '';
    this.adinamiaFraqueza = false;
    this.artralgia = false;
    this.calafrios = false;
    this.conjuntivite = false;
    this.coriza = false;
    this.congestaoNasal = false;
    this.dificuldadeDeglutir = false;
    this.gangliosLinfaticos = false;
    this.irritabilidadeOuConfusao = false;
    this.manchasVermelhas = false;
    this.tosse = false;
    this.dorDeGarganta = false;
    this.mialgia = false;
    this.escarro = false;
    this.sibilo = false;
    this.batimentoAsasNasais = false;
    this.dispneia = false;
    this.taquipneia = false;
    this.saturacaoDeOximetriaDePulso = false;
    this.cianoseCentral = false;
    this.diminuicaoDePulsoPeriferico = false;
    this.hipotensao = false;
    this.diarreia = false;
    this.cefaleia = false;
    this.nauseaVomito = false;
    this.tiragemIntercostal = false;
    this.perdaOlfatoPaladar = false;
    this.outros = '';
    this.existemOutrosSintomas = false;
  }

  aplicarTemperaturaFebre() {
    const temperaturaFebreNumbers = Utils.numbersOnly(this.temperaturaFebre);

    if (!temperaturaFebreNumbers || temperaturaFebreNumbers.length <= 0) {
      return null;
    }

    let temperaturaFebre;
    if (temperaturaFebreNumbers.length === 2) {
      temperaturaFebre = temperaturaFebreNumbers;
    } else {
      temperaturaFebre = `${temperaturaFebreNumbers.substring(0, 2)}.${temperaturaFebreNumbers.substring(2)}`;
    }
    return parseFloat(temperaturaFebre);
  }
}
