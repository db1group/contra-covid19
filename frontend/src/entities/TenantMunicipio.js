export default class TenantMunicipio {
  constructor(data = {}) {
    this.id = data.id || null;
    this.municipioId = data.municipioId || null;
    this.municipio = data.municipio || '';
  }
}
