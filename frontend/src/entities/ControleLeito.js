export default class ControleLeito {
  constructor(data = {}) {
    this.id = data.id || null;
    this.qtEnfermariaCovid = data.qtEnfermariaCovid || '0';
    this.qtUTIAdultaCovid = data.qtUTIAdultaCovid || '0';
    this.qtUTIPedCovid = data.qtUTIPedCovid || '0';
    this.qtUTINeoCovid = data.qtUTINeoCovid || '0';
    this.qtEnfermariaNormal = data.qtEnfermariaNormal || '0';
    this.qtUTIAdultaNormal = data.qtUTIAdultaNormal || '0';
    this.qtUTIPedNormal = data.qtUTIPedNormal || '0';
    this.qtUTINeoNormal = data.qtUTINeoNormal || '0';
    this.qtEnfermariaPrivado = data.qtEnfermariaPrivado || '0';
    this.qtUTIAdultaPrivado = data.qtUTIAdultaPrivado || '0';
    this.qtUTIPedPrivado = data.qtUTIPedPrivado || '0';
    this.qtUTINeoPrivado = data.qtUTINeoPrivado || '0';
  }

  totalEnfermarias() {
    const { qtEnfermariaCovid, qtEnfermariaNormal, qtEnfermariaPrivado } = this;
    return +qtEnfermariaCovid + +qtEnfermariaNormal + +qtEnfermariaPrivado;
  }

  totalUTIAdulta() {
    const { qtUTIAdultaCovid, qtUTIAdultaNormal, qtUTIAdultaPrivado } = this;
    return +qtUTIAdultaCovid + +qtUTIAdultaNormal + +qtUTIAdultaPrivado;
  }

  totalUTIPed() {
    const { qtUTIPedCovid, qtUTIPedNormal, qtUTIPedPrivado } = this;
    return +qtUTIPedCovid + +qtUTIPedNormal + +qtUTIPedPrivado;
  }

  totalUTINeo() {
    const { qtUTINeoCovid, qtUTINeoNormal, qtUTINeoPrivado } = this;
    return +qtUTINeoCovid + +qtUTINeoNormal + +qtUTINeoPrivado;
  }

  totalCovid() {
    const {
      qtEnfermariaCovid, qtUTIAdultaCovid, qtUTIPedCovid, qtUTINeoCovid,
    } = this;
    return +qtEnfermariaCovid + +qtUTIAdultaCovid + +qtUTIPedCovid + +qtUTINeoCovid;
  }

  totalNormal() {
    const {
      qtEnfermariaNormal, qtUTIAdultaNormal, qtUTIPedNormal, qtUTINeoNormal,
    } = this;
    return +qtEnfermariaNormal + +qtUTIAdultaNormal + +qtUTIPedNormal + +qtUTINeoNormal;
  }

  totalPrivado() {
    const {
      qtEnfermariaPrivado, qtUTIAdultaPrivado, qtUTIPedPrivado, qtUTINeoPrivado,
    } = this;
    return +qtEnfermariaPrivado + +qtUTIAdultaPrivado + +qtUTIPedPrivado + +qtUTINeoPrivado;
  }

  toRequestBody() {
    const { id, ...controleLeito } = this;
    return {
      ...controleLeito,
      qtEnfermariaCovid: this.qtEnfermariaCovid.toString(),
      qtUTIAdultaCovid: this.qtUTIAdultaCovid.toString(),
      qtUTIPedCovid: this.qtUTIPedCovid.toString(),
      qtUTINeoCovid: this.qtUTINeoCovid.toString(),
      qtEnfermariaNormal: this.qtEnfermariaNormal.toString(),
      qtUTIAdultaNormal: this.qtUTIAdultaNormal.toString(),
      qtUTIPedNormal: this.qtUTIPedNormal.toString(),
      qtUTINeoNormal: this.qtUTINeoNormal.toString(),
      qtEnfermariaPrivado: this.qtEnfermariaPrivado.toString(),
      qtUTIAdultaPrivado: this.qtUTIAdultaPrivado.toString(),
      qtUTIPedPrivado: this.qtUTIPedPrivado.toString(),
      qtUTINeoPrivado: this.qtUTINeoPrivado.toString(),
    };
  }
}
