import DateService from '@/services/DateService';
import TenantMunicipio from '@/entities/TenantMunicipio';

export default class TenantConfig {
  constructor(data = {}) {
    this.id = data.id || null;
    this.nome = data.nome || '';
    this.email = data.email || '';
    this.cnes = data.cnes || '';
    this.municipioId = data.municipioId || null;
    this.tokenSecretaria = data.tokenSecretaria || '';
    this.municipio = data.municipio || '';
    this.periodo = data.periodo || '';
    this.ultimoPeriodo = data.ultimoPeriodo || '';
    this.dtBloqueioFechamento = DateService.changeFormat(
      data.dtBloqueioFechamento,
      'YYYY-MM-DD',
      'DD/MM/YYYY',
    ) || '';
    this.municipios = data.municipios
      ? data.municipios.map((m) => new TenantMunicipio(m))
      : [];
  }

  toRequestBody() {
    return {
      ...this,
      dtBloqueioFechamento: DateService.changeFormat(this.dtBloqueioFechamento, 'DD/MM/YYYY', 'YYYY-MM-DD'),
    };
  }
}
