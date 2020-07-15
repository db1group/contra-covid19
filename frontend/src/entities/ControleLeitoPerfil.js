export default class ControleLeitoPerfil {
  constructor(data = {}, ControleLeito = {}) {
    this.id = data.id || '';
    this.causa = data.causa || '';
    if (data.Perfil) {
      this.perfilNome = data.Perfil.nome || '';
    }
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

  setId(id) {
    this.id = id;
  }

  setPerfilCausa(perfilNome, causa) {
    this.perfilNome = perfilNome;
    this.causa = causa;
  }

  setControleLeito(controleLeito) {
    this.ControleLeito = {
      ...controleLeito,
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
