export default class ControleLeitoPerfil {
  constructor(data = {}) {
    this.id = data.id || null;
    this.nome = data.nome || '';
    this.createdAt = data.createdAt || '';
    this.updatedAt = data.updatedAt || '';
  }

  toRequestBody() {
    const { id, ...controleLeitoPerfil } = this;
    return {
      ...controleLeitoPerfil,
      nome: this.nome.toString(),
      createdAt: this.createdAt.toString(),
      updatedAt: this.updatedAt.toString(),
    };
  }
}
