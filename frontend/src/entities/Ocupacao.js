export default class Ocupacao {
  constructor(data = {}) {
    this.id = data.id || null;
    this.descricao = data.descricao || '';
    this.classificacao = data.classificacao || '';
  }
}
