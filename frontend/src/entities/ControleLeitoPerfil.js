export default class ControleLeitoPerfil {
  constructor(perfil = {}, ControleLeito = {}) {
    this.perfilNome = perfil.perfilNome || '';
    this.causa = perfil.causa || '';
    this.ControleLeito = {
      qtEnfermariaCovid: ControleLeito.qtEnfermariaCovid || 0,
      qtUTIAdultaCovid: ControleLeito.qtUTIAdultaCovid || 0,
      qtUTIPedCovid: ControleLeito.qtUTIPedCovid || 0,
      qtUTINeoCovid: ControleLeito.qtUTINeoCovid || 0,
      qtEnfermariaNormal: ControleLeito.qtEnfermariaNormal || 0,
      qtUTIAdultaNormal: ControleLeito.qtUTIAdultaNormal || 0,
      qtUTIPedNormal: ControleLeito.qtUTIPedNormal || 0,
      qtUTINeoNormal: ControleLeito.qtUTINeoNormal || 0,
      qtEnfermariaPrivado: ControleLeito.qtEnfermariaPrivado || 0,
      qtUTIAdultaPrivado: ControleLeito.qtUTIAdultaPrivado || 0,
      qtUTIPedPrivado: ControleLeito.qtUTIPedPrivado || 0,
      qtUTINeoPrivado: ControleLeito.qtUTINeoPrivado || 0,
    };
  }


  toRequestBody() {
    const copy = { ...this.ControleLeito };
    delete copy.id;
    return {
      ControleLeito: {
        ...copy,
      },
      perfilNome: this.perfilNome.toString(),
      causa: this.causa.toString(),
    };
  }
}
