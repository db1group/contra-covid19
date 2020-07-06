export default class ControleLeitoPerfil {
  constructor(perfil = {}, ControleLeito = {}) {
    this.perfilNome = perfil.perfilNome || '';
    this.causa = perfil.causa || '';
    this.ControleLeito = {
      qtEnfermariaCovid: ControleLeito.qtEnfermariaCovid || '',
      qtUTIAdultaCovid: ControleLeito.qtUTIAdultaCovid || '',
      qtUTIPedCovid: ControleLeito.qtUTIPedCovid || '',
      qtUTINeoCovid: ControleLeito.qtUTINeoCovid || '',
      qtEnfermariaNormal: ControleLeito.qtEnfermariaNormal || '',
      qtUTIAdultaNormal: ControleLeito.qtUTIAdultaNormal || '',
      qtUTIPedNormal: ControleLeito.qtUTIPedNormal || '',
      qtUTINeoNormal: ControleLeito.qtUTINeoNormal || '',
      qtEnfermariaPrivado: ControleLeito.qtEnfermariaPrivado || '',
      qtUTIAdultaPrivado: ControleLeito.qtUTIAdultaPrivado || '',
      qtUTIPedPrivado: ControleLeito.qtUTIPedPrivado || '',
      qtUTINeoPrivado: ControleLeito.qtUTINeoPrivado || '',
    };
  }

  toRequestBody() {
    const { ...controleLeitoPerfil } = this;
    return {
      ...controleLeitoPerfil,
      perfilNome: this.perfilNome.toString(),
      causa: this.causa.toString(),
    };
  }
}
