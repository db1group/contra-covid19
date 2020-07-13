export default class Usuario {
  constructor(data = {}) {
    this.id = data.id || null;
    this.nome = data.nome || '';
    this.email = data.email || '';
    this.unidadeSaudeId = data.unidadeSaudeId || null;
    this.unidadeSaudeNome = data.unidadeSaudeNome || '';
    this.permissoes = data.permissoes || [];
  }
}
