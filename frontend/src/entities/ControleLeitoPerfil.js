export default class ControleLeitoPerfil {
  constructor(data = {}) {
    if (data.Perfil) {
      this.Perfil = {
        createdAt: data.Perfil.createdAt || '',
        id: data.Perfil.id || '',
        nome: data.Perfil.nome || '',
        updatedAt: data.Perfil.updatedAt || '',
      };
      this.perfilNome = data.Perfil.nome || '';
    }
    this.causa = data.causa || '';
    this.controleLeitoId = data.controleLeitoId || '';
    this.createdAt = data.createdAt || '';
    this.id = data.id || '';
    this.leitosUnidadeId = data.leitosUnidadeId || '';
    this.notificaLeitoId = data.notificaLeitoId || '';
    this.perfilId = data.perfilId || '';
    this.updatedAt = data.updatedAt || '';
  }

  toRequestBody() {
    const { ...controleLeitoPerfil } = this;
    return {
      ...controleLeitoPerfil,
      perfilId: this.perfilId.toString(),
      perfilNome: this.perfilNome.toString(),
      id: this.id.toString(),
      causa: this.causa.toString(),
      createdAt: this.createdAt.toString(),
      updatedAt: this.updatedAt.toString(),
      ControleLeito: this.ControleLeito.toString(),
    };
  }

  toTable(unidadeSaudeNome) {
    const { id, ...controleLeitoPerfil } = this;
    return {
      ...controleLeitoPerfil,
      id,
      unidadeSaudeNome,

    };
  }
}
