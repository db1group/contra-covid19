export default class ExamesImagem {
  constructor(data = {}) {
    this.raioNormal = data.raioNormal || false;
    this.raioInfiltradoIntersticial = data.raioInfiltradoIntersticial || false;
    this.raioConsolidacao = data.raioConsolidacao || false;
    this.raioMisto = data.raioMisto || false;
    this.raioOutro = data.raioOutro || '';
    this.realizouOutroRaioTorax = !!data.raioOutro || false;
    this.tomografiaNormal = data.tomografiaNormal || false;
    this.tomografiaVidroFoscoPredominioPerifericoBasal = data.tomografiaVidroFoscoPredominioPerifericoBasal || false;
    this.tomografiaAusenciaDerramePleural = data.tomografiaAusenciaDerramePleural || false;
    this.tomografiaAusenciaLinfonodoMediastenal = data.tomografiaAusenciaLinfonodoMediastenal || false;
    this.tomografiaOutro = data.tomografiaOutro || '';
    this.realizouOutraTomografiaTorax = !!data.tomografiaOutro || false;
  }
}
