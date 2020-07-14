import DateService from '@/services/DateService';

export default class ControleLeitoLista {
  constructor(data = {}) {
    this.controleLeitoId = data.controleLeitoId || '';
    this.createdAt = DateService.formatDateTypeToStringTypeWithMinutes(data.createdAt) || '';
    this.dtNotificacao = DateService.formatDateTypeToStringTypeWithMinutes(data.dtNotificacao) || '';
    this.id = data.id || '';
    this.unidadeSaudeId = data.unidadeSaudeId || '';
    this.updatedAt = DateService.formatDateTypeToStringTypeWithMinutes(data.updatedAt) || '';
  }

  toRequestBody() {
    const { id, ...controleLeito } = this;
    return {
      ...controleLeito,
      controleLeitoId: this.controleLeitoId.toString(),
      createdAt: DateService.toMomentObject(this.createdAt, 'DD/MM/YYYY HH:mm').toISOString(),
      dtNotificacao: DateService.toMomentObject(this.dtNotificacao, 'DD/MM/YYYY HH:mm').toISOString(),
      id: this.id.toString(),
      unidadeSaudeId: this.unidadeSaudeId.toString(),
      updatedAt: DateService.toMomentObject(this.updatedAt, 'DD/MM/YYYY HH:mm').toISOString(),
    };
  }

  toTable(unidadeSaudeNome) {
    const { id, ...controleLeito } = this;
    return {
      ...controleLeito,
      id,
      unidadeSaudeNome,
    };
  }
}
