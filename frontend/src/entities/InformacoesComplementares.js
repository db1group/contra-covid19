export default class InformacoesComplementares {
  constructor(data = {}) {
    this.medicacaoAntitermica = data.medicacaoAntitermica || false;
    this.nomeMedicacaoAntitermica = data.nomeMedicacaoAntitermica || '';
    this.medicacaoAnalgesica = data.medicacaoAnalgesica || false;
    this.nomeMedicacaoAnalgesica = data.nomeMedicacaoAnalgesica || '';
    this.medicacaoAntiflamatorio = data.medicacaoAntiflamatorio || false;
    this.nomeMedicacaoAntiflamatorio = data.nomeMedicacaoAntiflamatorio || '';
    this.medicacaoAntiviral = data.medicacaoAntiviral || false;
    this.nomeMedicacaoAntiviral = data.nomeMedicacaoAntiviral || '';
    this.historicoDeViagem = data.historicoDeViagem || false;
    this.dataDaViagem = data.dataDaViagem || '';
    this.localDaViagem = data.localDaViagem || '';
    this.recebeuVacinaDaGripeNosUltimosDozeMeses = data.recebeuVacinaDaGripeNosUltimosDozeMeses || false;
  }
}
