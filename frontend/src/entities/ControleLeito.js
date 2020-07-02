export default class ControleLeito {
  constructor(data = {}) {
    this.id = data.id || null;
    this.qtdeEnfermariaSus = data.qtdeEnfermariaSus || '0';
    this.qtdeUTIAdultoSus = data.qtdeUTIAdultoSus || '0';
    this.qtdePedSus = data.qtdePedSus || '0';
    this.qtdeNeoSus = data.qtdeNeoSus || '0';
    this.qtdeEnfermariaPrivado = data.qtdeEnfermariaPrivado || '0';
    this.qtdeUTIAdultoPrivado = data.qtdeUTIAdultoPrivado || '0';
    this.qtdePedPrivado = data.qtdePedPrivado || '0';
    this.qtdeNeoPrivado = data.qtdeNeoPrivado || '0';
  }

  totalEnfermarias() {
    const { qtdeEnfermariaSus, qtdeEnfermariaPrivado } = this;
    return +qtdeEnfermariaSus + +qtdeEnfermariaPrivado;
  }

  totalUTIAdulta() {
    const { qtdeUTIAdultoSus, qtdeUTIAdultoPrivado } = this;
    return +qtdeUTIAdultoSus + +qtdeUTIAdultoPrivado;
  }

  totalUTIPed() {
    const { qtdePedSus, qtdePedPrivado } = this;
    return +qtdePedSus + +qtdePedPrivado;
  }

  totalUTINeo() {
    const { qtdeNeoSus, qtdeNeoPrivado } = this;
    return +qtdeNeoSus + +qtdeNeoPrivado;
  }

  totalSus() {
    const {
      qtdeEnfermariaSus, qtdeUTIAdultoSus, qtdePedSus, qtdeNeoSus,
    } = this;
    return +qtdeEnfermariaSus + +qtdeUTIAdultoSus + +qtdePedSus + +qtdeNeoSus;
  }

  totalPrivado() {
    const {
      qtdeEnfermariaPrivado, qtdeUTIAdultoPrivado, qtdePedPrivado, qtdeNeoPrivado,
    } = this;
    return +qtdeEnfermariaPrivado + +qtdeUTIAdultoPrivado + +qtdePedPrivado + +qtdeNeoPrivado;
  }

  toRequestBody() {
    const { id, ...controleLeito } = this;
    return {
      ...controleLeito,
      qtdeEnfermariaSus: this.qtdeEnfermariaSus.toString(),
      qtdeUTIAdultoSus: this.qtdeUTIAdultoSus.toString(),
      qtdePedSus: this.qtdePedSus.toString(),
      qtdeNeoSus: this.qtdeNeoSus.toString(),
      qtdeEnfermariaPrivado: this.qtdeEnfermariaPrivado.toString(),
      qtdeUTIAdultoPrivado: this.qtdeUTIAdultoPrivado.toString(),
      qtdePedPrivado: this.qtdePedPrivado.toString(),
      qtdeNeoPrivado: this.qtdeNeoPrivado.toString(),
    };
  }
}
