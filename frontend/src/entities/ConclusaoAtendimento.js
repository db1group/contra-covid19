export default class {
  constructor(data = {}) {
    return {
      isolamentoDomiciliar: data.isolamentoDomiciliar || false,
      leitoComum: data.leitoComum || false,
      leitoUti: data.leitoUti || false,
      prontoSocorroOuAtendimento: data.prontoSocorroOuAtendimento || false,
      coletaMaterialParaDiagnostico: data.coletaMaterialParaDiagnostico || false,
      laboratorioOficial: data.laboratorioOficial || false,
      laboratorioRedePrivada: data.laboratorioRedePrivada || false,
    };
  }
};
