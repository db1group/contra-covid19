export default class VinculoEpidemologico {
  constructor(data = {}) {
    this.situacao1 = data.situacao1 || false;
    this.situacao2 = data.situacao2 || false;
    this.nome = data.nome || '';
  }
}
