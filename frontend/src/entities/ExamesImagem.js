export default class ExamesImagem {
  constructor(data = {}) {
    this.raioNormal = data.raioNormal || false;
    this.raioInfiltradoIntersticial = data.raioInfiltradoIntersticial || false;
    this.raioConsolidacao = data.raioConsolidacao || false;
    this.raioMisto = data.raioMisto || false;
    this.raioOutro = data.raioOutro || '';
    this.tomografiaNormal = data.congestaoNasal || false;
    this.tomografiaVidroFoscoPredominioPerifericoBasal = data.tomografiaVidroFoscoPredominioPerifericoBasal || false;
    this.tomografiaAusenciaDerramePleural = data.tomografiaAusenciaDerramePleural || false;
    this.tomografiaAusenciaLinfonodoMediastenal = data.tomografiaAusenciaLinfonodoMediastenal || false;
    this.tomografiaOutro = data.tomografiaOutro || '';
  }
}
