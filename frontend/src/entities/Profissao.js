
export default class Profissao {
  constructor(data = {}) {
    this.profissaoId = data.profissaoId || null;
    this.nome = data.nome || '';
  }
}
