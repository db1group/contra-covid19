export default class ControleLeitoLista {
  constructor(data = {}) {
    this.controleLeitoId = data.controleLeitoId;
    this.createdAt = data.createdAt;
    this.dtNotificacao = data.dtNotificacao;
    this.id = data.id;
    this.unidadeSaudeId = data.unidadeSaudeId;
    this.updatedAt = data.updatedAt;
  }

  toRequestBody() {
    const { id, ...controleLeito } = this;
    return {
      ...controleLeito,
      controleLeitoId: this.controleLeitoId.toString(),
      createdAt: this.createdAt.toString(),
      dtNotificacao: this.dtNotificacao.toString(),
      id: this.id.toString(),
      unidadeSaudeId: this.unidadeSaudeId.toString(),
      updatedAt: this.updatedAt.toString(),
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
