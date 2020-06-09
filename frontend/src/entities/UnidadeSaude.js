
export default class UnidadeSaude {
  constructor(data = {}) {
    this.id = data.id || null;
    this.nome = data.nome || '';
    this.municipioId = data.municipioId || null;
    this.municipio = data.municipio || '';
    this.cnes  = data.cnes || '';
  }
}
