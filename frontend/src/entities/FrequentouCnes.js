export default class FrequentouCnes {
  constructor(data = {}) {
    this.frequentouUnidade = data.frequentouUnidade || false;
    this.unidadeFrequentadaId = data.unidadeFrequentadaId || null;
    this.nomeFrequentada = data.nomeFrequentada || null;
  }

  toRequestBody() {
    const { nomeFrequentada, ...frequentada } = this;
    return {
      ...frequentada,
    };
  }
}
