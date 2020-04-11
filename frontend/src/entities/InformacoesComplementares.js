export default class {
  constructor(data = {}) {
    return {
      medicacaoAntitermica: data.medicacaoAntitermica || false,
      nomeMedicacaoAntitermica: data.nomeMedicacaoAntitermica || '',
      medicacaoAnalgesica: data.medicacaoAnalgesica || false,
      nomeMedicacaoAnalgesica: data.nomeMedicacaoAnalgesica || '',
      medicacaoAntiflamatorio: data.medicacaoAntiflamatorio || false,
      nomeMedicacaoAntiflamatorio: data.nomeMedicacaoAntiflamatorio || '',
      medicacaoAntiviral: data.medicacaoAntiviral || false,
      nomeMedicacaoAntiviral: data.nomeMedicacaoAntiviral || '',
      historicoDeViagem: data.historicoDeViagem || false,
      dataDaViagem: data.dataDaViagem || null,
      localDaViagem: data.localDaViagem || '',
      recebeuVacinaDaGripeNosUltimosDozeMeses: data.recebeuVacinaDaGripeNosUltimosDozeMeses || false,
    };
  }
};
